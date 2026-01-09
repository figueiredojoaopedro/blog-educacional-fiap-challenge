import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from '../repositories/posts.repository';
import { IPosts } from '../schemas/models/posts.interface';

describe('PostsService', () => {
  let service: PostsService;
  let repository: PostsRepository;

  const mockPost: IPosts = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content',
  };

  const mockPostsRepository = {
    getAllPosts: jest.fn(() => Promise.resolve([mockPost])),
    getPost: jest.fn((id: string) =>
      Promise.resolve(id === '1' ? mockPost : null),
    ),
    createPost: jest.fn((post: IPosts) =>
      Promise.resolve({ ...post, id: '2' }),
    ),
    updatePost: jest.fn((id: string, title: string, content: string) =>
      Promise.resolve(id === '1' ? { ...mockPost, title, content } : null),
    ),
    deletePost: jest.fn(() => Promise.resolve()),
    searchPosts: jest.fn((query: string) =>
      Promise.resolve(query === 'Test' ? [mockPost] : []),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: mockPostsRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result = await service.getAllPosts(10, 1);
      expect(result).toEqual([mockPost]);
      expect(repository.getAllPosts).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('getPost', () => {
    it('should return a single post', async () => {
      const result = await service.getPost('1');
      expect(result).toEqual(mockPost);
      expect(repository.getPost).toHaveBeenCalledWith('1');
    });

    it('should return null if post not found', async () => {
      const result = await service.getPost('99');
      expect(result).toBeNull();
      expect(repository.getPost).toHaveBeenCalledWith('99');
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const newPost: IPosts = { title: 'New Post', content: 'New content' };

      const result = await service.createPost(newPost);

      expect(result).toEqual({
        ...newPost,
        id: '2',
        createdAt: expect.any(String),
      });
      expect(repository.createPost).toHaveBeenCalledWith({
        ...newPost,
        createdAt: expect.any(String),
      });
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const updatedPost = {
        title: 'Updated Title',
        content: 'Updated Content',
      };
      const result = await service.updatePost(
        '1',
        updatedPost.title,
        updatedPost.content,
      );
      expect(result).toEqual({ ...mockPost, ...updatedPost });
      expect(repository.updatePost).toHaveBeenCalledWith(
        '1',
        updatedPost.title,
        updatedPost.content,
      );
    });

    it('should return null if post not found for update', async () => {
      const result = await service.updatePost('99', 'Title', 'Content');
      expect(result).toBeNull();
      expect(repository.updatePost).toHaveBeenCalledWith(
        '99',
        'Title',
        'Content',
      );
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      await service.deletePost('1');
      expect(repository.deletePost).toHaveBeenCalledWith('1');
    });
  });

  describe('searchPosts', () => {
    it('should return posts matching the query', async () => {
      const result = await service.searchPosts('Test');
      expect(result).toEqual([mockPost]);
      expect(repository.searchPosts).toHaveBeenCalledWith('Test');
    });

    it('should return an empty array if no posts match', async () => {
      const result = await service.searchPosts('NonExistent');
      expect(result).toEqual([]);
      expect(repository.searchPosts).toHaveBeenCalledWith('NonExistent');
    });
  });
});
