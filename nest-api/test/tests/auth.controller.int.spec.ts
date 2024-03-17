import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
	let controller: AuthController;

	const mockPrismaService = {
		user: {
			create: jest.fn(),
		},
	};

	const mockAuthService = {
		signup: jest.fn(async (dto: SignUpDto) => {
			(argon as any).hash = jest.fn().mockResolvedValue('hashedPassword');

			if (dto.email === 'registeredUser@gmail.com') {
				throw new BadRequestException('Email is already signed in!');
			}

			if (dto.email === 'invalid-email') {
				throw new BadRequestException('Other error!');
			}

			mockPrismaService.user.create.mockResolvedValue({
				id: 'someUserId',
				email: dto.email,
				username: dto.username,
				hash: 'hashedPassword',
				createAt: new Date(),
				role: 'FREE',
			});

			return { accessToken: '' };
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: PrismaService, useValue: mockPrismaService },
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should signup', async () => {
		const dto: SignUpDto = {
			email: 'newUser@gmail.com',
			username: 'newUser',
			password: 'newUser123',
		};

		const response = await controller.signup(dto);
		expect(response).toEqual({ accessToken: '' });
		expect(mockAuthService.signup).toHaveBeenCalledWith(dto);
	});

	it('should throw PrismaClientKnownRequestError if email is already registered', async () => {
		const dto: SignUpDto = {
			email: 'registeredUser@gmail.com',
			username: 'registeredUser',
			password: 'registeredUser123',
		};

		await expect(controller.signup(dto)).rejects.toThrow(BadRequestException);
	});

	it('should throw BadRequestException for other errors', async () => {
		const dto: SignUpDto = {
			email: 'invalid-email',
			username: 'InvalidUser',
			password: 'InvalidUser123',
		};

		await expect(controller.signup(dto)).rejects.toThrow(BadRequestException);
	});
});
