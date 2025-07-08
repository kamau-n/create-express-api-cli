# 🚀 create-express-api-cli

A powerful, plug-and-play CLI tool to scaffold a modern Express.js API with everything you need — from database setup to authentication, TypeORM, logging, environment configs, Docker, and even PM2 + Jenkins deployment.

---

## ✨ Features

✅ Choose between **TypeScript** and **JavaScript**  
✅ Clean, scalable folder structure  
✅ Database integration via **TypeORM**  
✅ Built-in **JWT authentication** and password hashing  
✅ Environment-based configs using `.env`  
✅ Centralized error handling  
✅ Winston logging + HTTP request logs  
✅ Docker-ready (`Dockerfile`, `docker-compose.yml`)  
✅ Optional `Jenkinsfile` for PM2-based deployment  
✅ Multi-package manager support: `pnpm`, `npm`, or `yarn`  
✅ Pre-configured with `nodemon` (JS) or `ts-node` (TS)  
✅ Easily extensible and production-ready

---

## 📦 Requirements

- Node.js `>= 18`
- One of: `pnpm`, `npm`, or `yarn`
- (Optional) Docker + PostgreSQL
- (Optional) Jenkins + PM2 (for deployment)

---

## 🚀 Quick Start

### Using `pnpm`

```
pnpm dlx create-express-api-cli-with-docker my-api --ts
```

### Using `npm`

```
npx create-express-api-cli-with-docker my-api --ts
```

### Using `yarn`

```
yarn create express-api-cli-with-docker my-api --ts
```

> To use JavaScript instead of TypeScript:

```
npx create-express-api-cli-with-docker my-api --js
```

> To include Docker and Jenkins support:

```
npx create-express-api-cli-with-docker my-api --ts --docker
```

---

## 🔧 CLI Options

| Option     | Description                    | Default |
| ---------- | ------------------------------ | ------- |
| `--ts`     | Scaffold a TypeScript API      | false   |
| `--js`     | Scaffold a JavaScript API      | false   |
| `--docker` | Include Docker + Jenkins setup | false   |

---

## 🗂 Project Structure

```
my-api/
├── src/
│   ├── config/           # Database configs (TypeORM)
│   ├── controllers/      # Route handlers (login/register)
│   ├── services/         # Business logic (AuthService)
│   ├── middlewares/      # Error + auth middleware
│   ├── routes/           # Express routers
│   ├── utils/            # Logger, helpers
│   ├── entities/         # TypeORM entity definitions
│   └── index.(ts|js)     # App entry point
├── .env
├── ormconfig.(ts|js)
├── package.json
├── docker-compose.yml   # (if --docker)
├── Dockerfile           # (if --docker)
├── Jenkinsfile          # (if --docker)
├── README.md
```

---

## 📥 Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=mydb
JWT_SECRET=supersecret
```

---

## 🧪 Scripts

For both TypeScript and JavaScript projects:

```
# Run in development mode
pnpm dev

# Build (TypeScript only)
pnpm build

# Start built app (TS) or direct (JS)
pnpm start

# Format code
pnpm format

# Lint code
pnpm lint
```

✅ Works the same with `npm run` or `yarn`.

---

## 🐳 Docker & Compose (Optional)

If you used `--docker`, your app comes with:

- `Dockerfile` to build your API
- `docker-compose.yml` to run with PostgreSQL
- `Jenkinsfile` for pipeline deployment via PM2

### Run with Docker locally:

```
docker-compose up --build
```

---

## ⚙️ Jenkins + PM2 Deployment

When you use `--docker`, a `Jenkinsfile` is included with:

```groovy
pm2 delete my-api || true
pm2 start dist/index.js --name my-api
pm2 save
```

### Prerequisites:

- Jenkins installed on deployment server
- PM2 installed globally (`npm install -g pm2`)
- Your `.env` variables set in Jenkins or on server

---

## 📚 Roadmap

- [x] TypeScript & JavaScript support
- [x] Docker + PostgreSQL + Jenkinsfile
- [x] pnpm/yarn/npm auto detection
- [ ] MongoDB (Mongoose) setup
- [ ] Swagger auto-docs
- [ ] CLI prompt (if no flags)
- [ ] Frontend pairing (Next.js, React)
- [ ] Role-based auth scaffolds
- [ ] Swagger GUI + Postman collection auto-export

---

## 🤝 Contributing

PRs are welcome!

```
git clone https://github.com/kamau-n/create-express-api-cli.git
cd create-express-api-cli
pnpm install

pnpm link

# Then test CLI locally
create-express-api-cli test-app --ts --docker
```

---

## 🪪 License

MIT © 2025 [Kamau Harrison]
