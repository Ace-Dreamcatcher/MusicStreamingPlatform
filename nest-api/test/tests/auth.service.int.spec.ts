import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto, SignUpDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
	let service: AuthService;

	const mockPrismaService = {
		user: {
			create: jest.fn(),
			findUnique: jest.fn(),
		},
	};

	const mockJwtService = {
		jwt: jest.fn(),
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
			email: 'IoannisNew@gmail.com',
			username: 'IoannisNew',
			password: 'Ioannis7',
		};

		const mockUser = {
			id: 'someUserId',
			email: dto.email,
			username: dto.username,
			hash: '$argon2id$v=19$m=65536,t=3,p=4$COaT0vbhjCETwq8/b503Kg$OSIxLiy4PHDmK2DIwBS/4lZ+qN1StQHAq7v9K7j4ijE',
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

	it('should find user and return access token', async () => {
		const dto: SignInDto = {
			email: 'Ioannis@gmail.com',
			password: 'Ioannis7',
		};

		const mockUser = {
			id: 'someUserId',
			email: dto.email,
			username: 'Ioannis',
			hash: '$argon2id$v=19$m=65536,t=3,p=4$COaT0vbhjCETwq8/b503Kg$OSIxLiy4PHDmK2DIwBS/4lZ+qN1StQHAq7v9K7j4ijE',
			createdAt: undefined,
			role: 'FREE',
		};

		const mockToken = 'mockAccessToken';

		mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
		mockJwtService.signAsync.mockResolvedValue({ accessToken: mockToken });
		mockConfigService.get.mockReturnValue('mockJwtSecret');

		const result = await service.signin(dto);

		expect(result.accessToken).toEqual({ accessToken: mockToken });
		expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
			where: {
				email: dto.email,
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
