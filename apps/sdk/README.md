# 07ai NodeJS SDK

This is the NodeJS SDK for [07ai](https://07ai.com).

You can start by installing the package:

```bash
npm install @07ai/node
```

## Usage
```typescript
import 07ai from '@07ai/node';
const 07ai = new 07ai('your api key', 'your self-hosted instance (optional)');
```

The available methods are:
- `post(posts: CreatePostDto)` - Schedule a post to 07ai
- `postList(filters: GetPostsDto)` - Get a list of posts
- `upload(file: Buffer, extension: string)` - Upload a file to 07ai
- `integrations()` - Get a list of connected channels
- `deletePost(id: string)` - Delete a post by ID

Alternatively you can use the SDK with curl, check the [07ai API documentation](https://docs.07ai.com/public-api) for more information.