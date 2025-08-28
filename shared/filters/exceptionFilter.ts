import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Code } from 'shared/constants';
import { ServiceResponse } from 'shared/models/serviceReponse.model';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GraphQLResponseExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception)

    // Convert to GraphQL context
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    try {
      // Handle validation errors (from class-validator)
      if (exception?.response?.message && Array.isArray(exception.response.message)) {
        const obj: Record<any, any> = {};

        exception.response.message.forEach((e) => {
          obj[e.property] = Object.values(e.constraints)[0];
        });

        const errorResponse: ServiceResponse<object> = {
          code: Code.BAD_INPUT,
          Errors: obj,
        };

        return new GraphQLError('Validation failed', {
          extensions: {
            code: Code.BAD_INPUT,
            errors: obj,
          },
        });
      }
    } catch {

      // Handle database errors
      if (exception instanceof QueryFailedError) {
        return new GraphQLError('Database error occurred', {
          extensions: {
            code: Code.SMTH_WITH_DB,
           
          },
        });
      }
    }

    // Handle specific exception types
    if (exception instanceof NotFoundException) {
      return new GraphQLError('Resource not found', {
        extensions: {
          code: Code.NOT_FOUND,
        
        },
      });
    }

    if (exception instanceof ForbiddenException) {
      return new GraphQLError('Access forbidden', {
        extensions: {
          code: Code.FORBIDDEN,
         
        },
      });
    }

    if (exception instanceof UnauthorizedException) {
      return new GraphQLError('Unauthorized access', {
        extensions: {
          code: Code.UN_AUTORIZED,
        
        },
      });
    }

    // Default error handling
    return new GraphQLError('Bad input provided', {
      extensions: {
        code:exception.message,
      },
    });
  }
}
