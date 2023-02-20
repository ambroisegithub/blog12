
import app from "../src/index1.js"
import request from "supertest"
import  BlogModel  from "../src/models/blogModels";

// Mock blog data
const blogData = {
  title: 'Test Blog',
  description: 'This is a test blog',
  image: "https://res.cloudinary.com/dtl8gpxzt/image/upload/v1676882027/tdtlcarqevz4pmdlptzu.jpg"
};

describe('Blog routes', () => {
  let createdBlogId;

  describe('GET /getAllBlogs', () => {
    it('should return a list of all blogs', async () => {
      const response = await request(app).get('/getAllBlogs');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.number).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /postBlog', () => {
    it('should create a new blog', async () => {
      const response = await request(app)
        .post('/postBlog')
        .send(blogData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.content.newPost.title).toBe(blogData.title);

      // Save the created blog id for later use
      createdBlogId = response.body.content.newPost._id;
    });
  });

  describe('POST /comment/63f1d9a1c6511c39625f39f0', () => {
    it('should create a new comment for the specified blog', async () => {
      const commentData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        comment: 'This is a test comment'
      };

      const response = await request(app)
        .post(`/comment/${createdBlogId}`)
        .send(commentData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.comment.name).toBe(commentData.name);
    });
  });

  describe('PATCH /update/63f1d9a1c6511c39625f39f0', () => {
    it('should update the specified blog', async () => {
      const updatedBlogData = {
        title: 'Updated Test Blog',
        description: 'This is an updated test blog',
        image: "https://res.cloudinary.com/dtl8gpxzt/image/upload/v1676882027/tdtlcarqevz4pmdlptzu.jpg"
      };

      const response = await request(app)
        .patch(`/update/${createdBlogId}`)
        .send(updatedBlogData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Post updated successfully');
    });
  });

  describe('GET /blog/63f1d9a1c6511c39625f39f0', () => {
    it('should return the specified blog', async () => {
      const response = await request(app).get(`/blog/${createdBlogId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.post.title).toBe('Updated Test Blog');
    });
  });

  describe('DELETE /blog/63f1d9a1c6511c39625f39f0', () => {
    it('should delete the specified blog', async () => {
      const response = await request(app).delete(`/blog/${createdBlogId}`);

      expect(response.status).toBe(204);
    });
});
});
   // it('should return 400 if the specified
