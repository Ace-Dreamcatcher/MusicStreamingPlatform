import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { access } from 'fs';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
	let service: AuthService;

	const mockPrismaService = {
		user: {
			create: jest.fn(),
		},
	};

	const mockJwtService = {
		signAsync: jest.fn(),
	};

	const mockConfigService = {
		get: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: PrismaService, useValue: mockPrismaService },
				{ provide: JwtService, useValue: mockJwtService },
				{ provide: ConfigService, useValue: mockConfigService },
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create user and return access token', async () => {
		const dto: SignUpDto = {
			email: 'newUser@gmail.com',
			username: 'newUser',
			password: 'newUser123',
		};

		const mockUser = {
			id: 'someUserId',
			email: dto.email,
			username: dto.username,
			hash: 'hashedPassword',
			createdAt: undefined,
			role: 'FREE',
		};

		const mockToken = 'mockAccessToken';

		mockPrismaService.user.create.mockResolvedValue(mockUser);
		mockJwtService.signAsync.mockResolvedValue({ accessToken: mockToken });
		mockConfigService.get.mockReturnValue('mockJwtSecret');

		const result = await service.signup(dto);

		expect(result.accessToken).toEqual({ accessToken: mockToken });
		expect(mockPrismaService.user.create).toHaveBeenCalledWith({
			data: {
				email: dto.email,
				username: dto.username,
				hash: expect.any(String),
			},
		});
		expect(mockJwtService.signAsync).toHaveBeenCalledWith(
			{
				id: mockUser.id,
				email: mockUser.email,
				username: mockUser.username,
				hash: mockUser.hash,
				createdAt: mockUser.createdAt,
				role: mockUser.role,
			},
			{
				expiresIn: '120m',
				secret: 'mockJwtSecret',
			},
		);
		expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET');
	});
});
