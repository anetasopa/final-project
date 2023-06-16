import { NextResponse } from 'next/server';
import { getCategories } from '../../../../../database/categories';
import { Category } from '../../../../../migrations/1686916405-createTableCategories';

export type Error = {
  error: string;
};

type ProductsResponseBodyGet = { categories: Category[] } | Error;

export async function GET(): Promise<NextResponse<ProductsResponseBodyGet>> {
  const categories = await getCategories();

  return NextResponse.json({ categories: categories });
}
