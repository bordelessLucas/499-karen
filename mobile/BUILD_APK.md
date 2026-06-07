# Gerar APK (EAS Build)

## 1. Variáveis Firebase no EAS (obrigatório)

O `.env` local **não** vai para a nuvem. Antes do build, envie as variáveis:

```bash
cd mobile
eas env:push --environment preview --path .env
eas env:push --environment production --path .env
```

Confirme no painel: [expo.dev](https://expo.dev) → projeto **499-borderless** → **Environment variables**.

## 2. Gerar APK

```bash
cd mobile
eas build --profile preview --platform android
```

O perfil `preview` gera **APK** (instalação direta, sem Play Store).

## 3. Instalar

Baixe pelo link/QR do terminal ou em **Expo → Builds** e instale no Android (permita “fontes desconhecidas” se pedido).

## Login no app

- E-mail: `demo@borderless.com`
- Senha: `123456`

## Problemas comuns

| Sintoma | Solução |
|--------|---------|
| Tela “Configuração incompleta” | Rode `eas env:push` e gere o APK de novo |
| App fecha ao abrir | Veja logs com `adb logcat` ou gere build `development` |
| CRM vazio | Firebase/Firestore — confira regras e dados no console |
