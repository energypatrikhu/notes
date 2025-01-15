# Szükségek
- MariaDB/MySQL
- NodeJS

# Használat
### Docker (Ajánlott)

1. Repó klónozása
    ```
    git clone https://github.com/energypatrikhu/notes.git
    ```

2. Docker container indítása
    ```
    npm run docker
    ```

### Dedikált gép

1. Repó klónozása
    ```
    git clone https://github.com/energypatrikhu/notes.git
    ```

2. Függőségek telepítése
    ```
    npm install
    ```

3. Database beállítása
    - ```.env```
    ```
    DATABASE_URL="mysql://{USERNAME}:{PASSWORD}@localhost:3306/{DATABASE-NEVE}"
    ```

4. Táblák létrehozása
    ```
    npm run prisma:push
    ```

5. Build
    ```
    npm run build
    ```

6. Futtatás
    ```
    npm run preview
    ```