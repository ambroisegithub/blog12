

// import request from "supertest";
import app from "../src/index1.js";
import { expect, jest, test } from "@jest/globals";
import request from 'supertest';
import cloudinary from 'cloudinary';
// import app from '../app';
import upload from '../src/helpers/multer';
import { UploadToCloud } from '../src/helpers/cloud';

// Jest mock for cloudinary
jest.mock('cloudinary', () => ({
  uploader: {
    upload: jest.fn(),
  },
}));

describe('Test image upload functionality', () => {
  test('POST /api/v1/upload should upload an image to cloudinary', async () => {
    // Set up a mock image file
    const filePath = `${__dirname}/test_files/image.png`;
    const mockFile = {
      fieldname: 'image',
      originalname: 'caton3.jpg',
      encoding: '7bit',
      mimetype: 'image/jpg',
      destination: './images',
      filename: 'caton3.jpg',
      path: filePath,
      size: 31077,
    };

    // Mock the cloudinary upload function to return a response
    const mockResponse = { public_id: '1234', url: 'https://res.cloudinary.com/dtl8gpxzt/image/upload/v1676564035/aveggcjskspxu2e2epc4.jpg' };
    cloudinary.uploader.upload.mockResolvedValue(mockResponse);

    // Make the request to the API
    const response = await request(app)
      .post('/api/v1/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('image', filePath);

    // Check the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);

    // Check that the file was deleted from the server
    expect(() => fs.accessSync(filePath)).toThrow();
  });
});

describe('Test multer middleware', () => {
  test('should return an error for unsupported file types', async () => {
    const response = await request(app)
      .post('/api/v1/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('image', `${__dirname}/images/caton3.jpg`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('File type is not supported');
  });
});

describe('Test cloudinary service', () => {
  test('should return an error for invalid file path', async () => {
    const mockResponse = { status: 400, message: 'File not found' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const result = await UploadToCloud('invalid/path', res);

    expect(result).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });
});
