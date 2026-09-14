import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsService, MOCK_PRODUCTS, MOCK_QUESTIONS, MOCK_FEEDBACKS } from '@/lib/sheets';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'getProducts';
  const productId = searchParams.get('productId') || undefined;

  try {
    if (action === 'getProducts') {
      const products = await GoogleSheetsService.fetchProducts();
      return NextResponse.json(products);
    }

    if (action === 'getQuestions') {
      const questions = await GoogleSheetsService.fetchQuestions(productId);
      return NextResponse.json(questions);
    }

    if (action === 'getFeedbacks') {
      const feedbacks = await GoogleSheetsService.fetchFeedbacks();
      return NextResponse.json(feedbacks);
    }

    return NextResponse.json({ status: 'ok', message: 'J&J Solutions API running' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'submitFeedback') {
      const result = await GoogleSheetsService.submitFeedback(payload);
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
