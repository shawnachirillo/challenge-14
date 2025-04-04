import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { username: string }; 
    }
  }
}

// declare namespace Express {
//     interface Request {
//       user?: {
//         username: string;
//       };
//     }
//   }

export{};
