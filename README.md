# 📽️ Projeto POS React — Catálogo de Filmes (React + Vite + MUI)

Aplicação SPA de CRUD de filmes, com integração opcional à API pública do TMDB para busca de títulos, navegação entre páginas, autenticação simples (mock) para acesso à área administrativa e UI com Material UI.

## ✨ Principais recursos

- **CRUD local (sem backend)** com persistência em `localStorage`
- **Busca e importação** de filmes via **TMDB** (opcional)
- **React Router** (rotas públicas e rota protegida `/admin`)
- **React Query** (cache, prefetch, cancelamento com AbortController)
- **Material UI** (tema dark, componentes e estilos por arquivo)
- **Arquitetura modular**: Context API, hooks e serviços separados

---

## 🧱 Stack

- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Material UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)

---

## 🚀 Como rodar

```bash
# 1) Instalar dependências
npm install

# 2) Criar .env com a chave do TMDB (opcional, só para página /tmdb)
#    pegue sua chave em https://www.themoviedb.org/ (Settings > API)
echo "VITE_TMDB_KEY=SUA_CHAVE_AQUI" > .env

# 3) Subir o dev server
npm run dev
```

Abra em: http://localhost:5173/

---

## 🗂️ Estrutura de pastas (resumo)

```
src/
  components/
  contexts/
  hooks/
  pages/
  routes/
  services/
  theme/
  App.jsx
  main.jsx
  index.css
```

---

## 🔐 Autenticação (mock)

- Página: `/login`
- Credenciais de exemplo:
  - **E-mail**: `admin@app.com`
  - **Senha**: qualquer senha com **6+ caracteres**
- Após logar: redireciona para `/admin`.
- Sessão persistida em `localStorage` (`auth-token`).

> **Observação**: é um mock simples para fins didáticos. Troque por uma API real quando necessário.

---

## 🔎 Integração TMDB

- Rota: `/tmdb`
- Busca filmes por título (debounce 300ms).
- Clique em **“Adicionar ao catálogo”** para transformar o resultado do TMDB no seu modelo local (title, genre, releaseYear, rating) e salvar no CRUD.
- Requer `.env`:
  ```env
  VITE_TMDB_KEY=SUACHAVEV3
  ```

---

## 🧭 Rotas

- `/` → redireciona para `/movies`
- `/movies` → catálogo CRUD local
- `/tmdb` → busca na API do TMDB
- `/login` → autenticação (mock)
- `/admin` → **rota protegida**

---

## 🧠 Conceitos aplicados

- **State/Props** para formulários e listagem
- **Renderização condicional** para estados de feedback
- **Context API** para estado global de filmes e auth
- **Hooks** (`useState`, `useEffect`, `useMemo`, `useForm`)
- **React Query**: cache, prefetch e cancelamento
- **AbortController + Promise.race** (timeout seguro)
- **Material UI** com `ThemeProvider`, `CssBaseline`, tema dark

---

## 🧪 Scripts úteis

```bash
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run preview   # pré-visualizar build
```

---

## ✅ Boas práticas usadas

- Arquivos de estilo separados (`.styles.js`)
- Handlers e lógica fora do JSX
- Feedback centralizado (`Feedback`)
- Paginação (`TablePagination` do MUI)
- `Dialog` MUI planejado para confirmação de exclusão futura

---

## 🧰 Dicas & Troubleshooting

- **Tabela não renderiza**: verifique o `MoviesProvider` no `App.jsx`
- **Erro de contexto**: envolva as rotas com `<MoviesProvider>`
- **TMDB sem resultados**: verifique `VITE_TMDB_KEY` e reinicie o servidor

---

## 📄 Licença

Uso educacional/livre.
