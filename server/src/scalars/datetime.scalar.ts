import { Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar {
  description = 'Custom scalar type representing a DateTime';

  parseValue(value: string): Date {
    // 값이 문자열로 전달되는 경우 여기서 Date 객체로 변환합니다.
    return new Date(value);
  }

  serialize(value: Date): string {
    // Date 객체를 다시 문자열로 직렬화하여 전달합니다.
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      // 문자열 리터럴인 경우 Date 객체로 변환합니다.
      return new Date(ast.value);
    }
    return null;
  }
}
