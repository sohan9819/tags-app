import { NextResponse } from 'next/server';

const items = ['list_1', 'list_2', 'list_3', 'list_4', 'list_5'];

export async function GET(req: Request, res: Response) {
  console.log('Get the tags');
  return NextResponse.json(
    {
      message: 'OK',
      items,
    },
    { status: 200 }
  );
}
