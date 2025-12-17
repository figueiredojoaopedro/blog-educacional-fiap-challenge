import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  getPosts(){
    return [];
  }

  @Get(':id')
  getPost(@Param('id') id: string){
    return {};
  }

  @Get(':word')
  getBySeach(@Param('word') word: string) {
    return [];
  }

  @Post()
  post(@Body() body: any){
    return 1;
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: any){
    return 2;
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return true;
  }
}
