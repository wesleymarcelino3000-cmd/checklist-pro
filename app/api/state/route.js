import { get, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PATHNAME = 'checklist-pro/state.json';

const initialState = {
  activeList: 'geral',
  lists: {
    geral: {
      name: 'Checklist Geral',
      tasks: [
        { id: 'welcome-1', title: 'Revisar atividades do dia', done: false, priority: 'high', date: '' },
        { id: 'welcome-2', title: 'Conferir itens concluídos', done: true, priority: 'normal', date: '' }
      ]
    }
  }
};

function validState(value) {
  return Boolean(value && typeof value === 'object' && typeof value.activeList === 'string' && value.lists && typeof value.lists === 'object' && value.lists[value.activeList]);
}

async function readState() {
  try {
    const result = await get(PATHNAME, { access: 'private' });
    if (!result || result.statusCode !== 200 || !result.stream) return initialState;
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text);
    return validState(parsed) ? parsed : initialState;
  } catch (error) {
    if (error?.name === 'BlobNotFoundError') return initialState;
    throw error;
  }
}

export async function GET() {
  try {
    const state = await readState();
    return NextResponse.json(state, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    console.error('Erro ao ler checklist:', error);
    return NextResponse.json({ error: 'Não foi possível carregar os dados.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!validState(body)) return NextResponse.json({ error: 'Estrutura de dados inválida.' }, { status: 400 });
    const serialized = JSON.stringify(body);
    if (serialized.length > 1_500_000) return NextResponse.json({ error: 'O checklist ficou grande demais.' }, { status: 413 });
    await put(PATHNAME, serialized, { access: 'private', contentType: 'application/json; charset=utf-8', addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erro ao salvar checklist:', error);
    return NextResponse.json({ error: 'Não foi possível salvar os dados.' }, { status: 500 });
  }
}
