export interface Usuario {
  id: string;
  nome: string;
  email: string;
  preferencias: string[];
}

const CHAVE_USUARIOS = 'bugiganga-usuarios';
const CHAVE_SESSAO = 'bugiganga-sessao';

export function obterUsuariosSalvos(): Usuario[] {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]') as Usuario[];
  } catch {
    return [];
  }
}

export function salvarUsuarioNoStorage(usuario: Usuario): void {
  const usuarios = obterUsuariosSalvos();
  const indice = usuarios.findIndex(u => u.id === usuario.id);
  if (indice >= 0) usuarios[indice] = usuario;
  else usuarios.push(usuario);
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

export function obterUsuarioAtual(): Usuario | null {
  try {
    const sessao = localStorage.getItem(CHAVE_SESSAO);
    return sessao ? (JSON.parse(sessao) as Usuario) : null;
  } catch {
    return null;
  }
}

export function salvarSessaoAtiva(usuario: Usuario): void {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
}

export function removerSessaoAtiva(): void {
  localStorage.removeItem(CHAVE_SESSAO);
}

export function gerarUserId(email: string): string {
  let hash = 0;
  for (const caractere of email.toLowerCase()) {
    hash = (hash * 31 + caractere.charCodeAt(0)) | 0;
  }
  return `user-${Math.abs(hash)}`;
}

export function fazerLogin(email: string): { sucesso: boolean; mensagem?: string; usuario?: Usuario } {
  const usuarios = obterUsuariosSalvos();
  const existente = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existente) {
    salvarSessaoAtiva(existente);
    return { sucesso: true, usuario: existente };
  }

  return {
    sucesso: false,
    mensagem: 'E-mail não encontrado. Selecione "Criar nova conta" acima.'
  };
}

export function cadastrarUsuario(nome: string, email: string): Usuario {
  const novoUsuario: Usuario = {
    id: gerarUserId(email),
    nome,
    email,
    preferencias: []
  };
  salvarUsuarioNoStorage(novoUsuario);
  salvarSessaoAtiva(novoUsuario);
  return novoUsuario;
}

export function atualizarPreferenciasUsuario(usuario: Usuario, preferencias: string[]): Usuario {
  const usuarioAtualizado = { ...usuario, preferencias };
  salvarUsuarioNoStorage(usuarioAtualizado);
  salvarSessaoAtiva(usuarioAtualizado);
  return usuarioAtualizado;
}