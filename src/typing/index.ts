import { ParameterizedContext, Next as NextContext } from 'koa';
import Router from 'koa-router';

export type CTX = ParameterizedContext<any, Router.IRouterParamContext<any, {}>>;
export type Next = NextContext;

export interface QueryPaging {
  limit?: number;
  offset?: number;
}

export enum PeriodEnum {
  '1_DAY' = '1_DAY',
  '3_DAY' = '3_DAY',
  '1_WEEK' = '1_WEEK',
  '1_MONTH' = '1_MONTH',
  '3_MONTH' = '3_MONTH',
  '6_MONTH' = '6_MONTH',
}

export { LoginInput } from './Input';
