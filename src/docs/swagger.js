import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Wild Travels Backend API',
      version: '1.0.0',
      description: 'Swagger documentation for the Wild Travels backend.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        sessionCookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'sessionId',
          description:
            'Session cookie authentication. Protected routes also rely on the accessToken cookie set during login.',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Something went wrong',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '686bde17a6a33d2ca9a5f001',
            },
            category: {
              type: 'string',
              example: 'Mountains',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '686bde17a6a33d2ca9a5f010',
            },
            name: {
              type: 'string',
              example: 'Oleh',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'oleh@example.com',
            },
            avatarUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/avatar.jpg',
            },
            articlesAmount: {
              type: 'integer',
              example: 12,
            },
            savedArticles: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Story: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '686bde17a6a33d2ca9a5f020',
            },
            img: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/story.jpg',
            },
            title: {
              type: 'string',
              example: 'A week in the Alps',
            },
            article: {
              type: 'string',
              example: 'We started at sunrise and crossed three ridges...',
            },
            category: {
              oneOf: [
                {
                  type: 'string',
                  example: '686bde17a6a33d2ca9a5f001',
                },
                {
                  $ref: '#/components/schemas/Category',
                },
              ],
            },
            rate: {
              type: 'integer',
              example: 92,
            },
            savedCount: {
              type: 'integer',
              example: 17,
            },
            ownerId: {
              type: 'string',
              example: '686bde17a6a33d2ca9a5f010',
            },
            date: {
              type: 'string',
              example: '2026-07-01',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'oleh@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'strongPass123',
            },
            name: {
              type: 'string',
              minLength: 3,
              example: 'Oleh',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'oleh@example.com',
            },
            password: {
              type: 'string',
              example: 'strongPass123',
            },
          },
        },
        CreateStoryRequest: {
          type: 'object',
          required: ['img', 'title', 'article', 'category'],
          properties: {
            img: {
              type: 'string',
              format: 'binary',
            },
            title: {
              type: 'string',
              minLength: 2,
              maxLength: 40,
              example: 'Road trip to the Carpathians',
            },
            article: {
              type: 'string',
              minLength: 12,
              maxLength: 3000,
              example: 'A detailed travel story with route notes and highlights.',
            },
            category: {
              type: 'string',
              example: 'Mountains',
              description:
                'Category name. The backend resolves it to the corresponding category id.',
            },
            rate: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              example: 88,
            },
            date: {
              type: 'string',
              pattern: '^\\d{4}-\\d{2}-\\d{2}$',
              example: '2026-07-01',
            },
          },
        },
        UpdateAvatarRequest: {
          type: 'object',
          required: ['avatar'],
          properties: {
            avatar: {
              type: 'string',
              format: 'binary',
            },
          },
        },
        UsersListResponse: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
            page: {
              type: 'integer',
            },
            perPage: {
              type: 'integer',
            },
            totalUsers: {
              type: 'integer',
            },
            totalPages: {
              type: 'integer',
            },
          },
        },
        UserStoriesResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            stories: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Story',
              },
            },
            page: {
              type: 'integer',
            },
            perPage: {
              type: 'integer',
            },
            totalStories: {
              type: 'integer',
            },
            totalPages: {
              type: 'integer',
            },
          },
        },
      },
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User registered successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      newUser: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Validation error or email already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Log in a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Logged in successfully and auth cookies are set',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      user: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Log out the current session',
          responses: {
            204: {
              description: 'Logged out successfully',
            },
          },
        },
      },
      '/api/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh user session cookies',
          responses: {
            200: {
              description: 'Session refreshed successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Session refreshed',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Missing, invalid, or expired session cookies',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stories/recommended': {
        get: {
          tags: ['Stories'],
          summary: 'Get recommended stories by category',
          parameters: [
            {
              in: 'query',
              name: 'category',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Category id',
            },
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'perPage',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            200: {
              description: 'Recommended stories fetched successfully',
            },
            400: {
              description: 'Missing category query parameter',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stories/saved': {
        get: {
          tags: ['Stories'],
          summary: 'Get saved stories for the authenticated user',
          security: [{ sessionCookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'limit',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            200: {
              description: 'Saved stories fetched successfully',
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stories': {
        get: {
          tags: ['Stories'],
          summary: 'Get paginated stories',
          parameters: [
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'perPage',
              schema: {
                type: 'integer',
                default: 12,
              },
            },
            {
              in: 'query',
              name: 'category',
              schema: {
                type: 'string',
              },
              description: 'Category id',
            },
            {
              in: 'query',
              name: 'type',
              schema: {
                type: 'string',
                enum: ['popular'],
              },
            },
          ],
          responses: {
            200: {
              description: 'Stories fetched successfully',
            },
          },
        },
        post: {
          tags: ['Stories'],
          summary: 'Create a new story',
          security: [{ sessionCookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/CreateStoryRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Story created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Story',
                  },
                },
              },
            },
            400: {
              description: 'Validation error or missing image',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            404: {
              description: 'Category not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/stories/{storyId}': {
        get: {
          tags: ['Stories'],
          summary: 'Get a story by id',
          parameters: [
            {
              in: 'path',
              name: 'storyId',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Story fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Story',
                  },
                },
              },
            },
            404: {
              description: 'Story not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Get paginated users',
          parameters: [
            {
              in: 'query',
              name: 'perPage',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'sortBy',
              schema: {
                type: 'string',
                default: 'articlesAmount',
              },
            },
            {
              in: 'query',
              name: 'sortOrder',
              schema: {
                type: 'string',
                enum: ['asc', 'desc'],
                default: 'asc',
              },
            },
          ],
          responses: {
            200: {
              description: 'Users fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UsersListResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/users/{userId}': {
        get: {
          tags: ['Users'],
          summary: 'Get a user and their stories',
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              in: 'query',
              name: 'perPage',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'category',
              schema: {
                type: 'string',
              },
              description: 'Category id filter for stories',
            },
            {
              in: 'query',
              name: 'search',
              schema: {
                type: 'string',
              },
              description: 'Search in title and article',
            },
            {
              in: 'query',
              name: 'sortBy',
              schema: {
                type: 'string',
                default: '_id',
              },
            },
            {
              in: 'query',
              name: 'sortOrder',
              schema: {
                type: 'string',
                enum: ['asc', 'desc'],
                default: 'asc',
              },
            },
          ],
          responses: {
            200: {
              description: 'User and stories fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserStoriesResponse',
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/users/savedArticles/{articleId}': {
        post: {
          tags: ['Users'],
          summary: 'Save an article for the authenticated user',
          security: [{ sessionCookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'articleId',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            201: {
              description: 'Article added to saved articles',
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            404: {
              description: 'Article not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            409: {
              description: 'Article already saved',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'Remove a saved article for the authenticated user',
          security: [{ sessionCookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'articleId',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Article removed from saved articles',
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            404: {
              description: 'Article is not in saved articles',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/profile/me': {
        get: {
          tags: ['Profile'],
          summary: 'Get the current authenticated user',
          security: [{ sessionCookieAuth: [] }],
          responses: {
            200: {
              description: 'Current user fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/profile/avatar': {
        patch: {
          tags: ['Profile'],
          summary: 'Update the authenticated user avatar',
          security: [{ sessionCookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/UpdateAvatarRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Avatar updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            400: {
              description: 'Avatar file is required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/profile/stories': {
        get: {
          tags: ['Profile'],
          summary: 'Get stories created by the authenticated user',
          security: [{ sessionCookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'page',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              in: 'query',
              name: 'perPage',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            200: {
              description: 'Own stories fetched successfully',
            },
            401: {
              description: 'Authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Get all categories',
          responses: {
            200: {
              description: 'Categories fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'integer',
                        example: 200,
                      },
                      message: {
                        type: 'string',
                        example: 'Categories fetched successfully',
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Category',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
