import { CTX } from '../typing';

export default (ctx: CTX, error: any) => {
  let ERROR = JSON.parse(JSON.stringify(error));

  const { name } = ERROR;

  console.log('Error_Logging: ', ERROR);

  switch (name) {
    case 'EntityNotFound':
      ctx.status = 404;
      break;

    case 'JsonWebTokenError':
      ctx.status = 400;
      ERROR = { ...ERROR, name: 'Unauthenticated' };
      break;

    default:
      ctx.status = 500;
      break;
  }

  ctx.body = ERROR;
};
