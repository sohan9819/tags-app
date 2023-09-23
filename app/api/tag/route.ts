import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'data.json');

export async function GET(req: Request, res: Response) {
  try {
    if (!fs.existsSync(filePath)) {
      // Create the file if it doesn't exist
      const initialData = { tags: [] };
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { tags } = JSON.parse(fileContent);

    return NextResponse.json(
      {
        message: 'OK',
        tags,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  const tags = await req.json();

  try {
    if (!fs.existsSync(filePath)) {
      // Create the file if it doesn't exist
      const initialData = { tags: [] };
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    data.tags = tags;
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json(
      {
        message: 'Tag added successfully',
        tags,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error writing JSON file:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
