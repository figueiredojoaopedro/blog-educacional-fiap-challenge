import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from '../services/posts.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPosts } from '../schemas/models/posts.interface';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPost: IPosts = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content',
    author: 'Test Author',
  };

  const mockPostsService = {
    getAllPosts: jest.fn(() => Promise.resolve([mockPost])),
    getPost: jest.fn((id: string) => Promise.resolve(id === '1' ? mockPost : null)),
    createPost: jest.fn((post: IPosts) => Promise.resolve({ ...post, id: '2' })),
    updatePost: jest.fn((id: string, title: string, content: string) =>
      Promise.resolve(id === '1' ? { ...mockPost, title, content } : null)
    ),
    deletePost: jest.fn(() => Promise.resolve()),
    searchPosts: jest.fn((query: string) =>
      Promise.resolve(query === 'Test' ? [mockPost] : [])
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const result = await controller.getPosts();
      expect(result).toEqual([mockPost]);
      expect(service.getAllPosts).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('searchPosts', () => {
    it('should return posts matching the query', async () => {
      const result = await controller.searchPosts('Test');
      expect(result).toEqual([mockPost]);
      expect(service.searchPosts).toHaveBeenCalledWith('Test');
    });
  });

  describe('getPost', () => {
    it('should return a single post', async () => {
      const result = await controller.getPost('1');
      expect(result).toEqual(mockPost);
      expect(service.getPost).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if post not found', async () => {
      await expect(controller.getPost('99')).rejects.toThrow(NotFoundException);
      expect(service.getPost).toHaveBeenCalledWith('99');
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const createDto: CreatePostDto = { title: 'New Post', content: 'New content', author: 'New Author' };
      const result = await controller.createPost(createDto);
      expect(result).toEqual({ title: createDto.title, content: createDto.content, id: '2' });
      expect(service.createPost).toHaveBeenCalledWith({ title: createDto.title, content: createDto.content });
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const updateDto: UpdatePostDto = { title: 'Updated Title', content: 'Updated Content' };
      const result = await controller.updatePost('1', updateDto);
      expect(result).toEqual({ ...mockPost, title: updateDto.title, content: updateDto.content });
      expect(service.updatePost).toHaveBeenCalledWith('1', updateDto.title, updateDto.content);
    });

    it('should throw NotFoundException if post not found for update', async () => {
      const updateDto: UpdatePostDto = { title: 'Updated Title', content: 'Updated Content' };
      await expect(controller.updatePost('99', updateDto)).rejects.toThrow(NotFoundException);
      expect(service.updatePost).toHaveBeenCalledWith('99', updateDto.title, updateDto.content);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const result = await controller.deletePost('1');
      expect(result).toEqual({ message: 'Post with ID "1" has been deleted' });
      expect(service.deletePost).toHaveBeenCalledWith('1');
    });
  });
});
