# Migration `20200518015824-database`

This migration has been generated at 5/18/2020, 1:58:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Cep" (
"cep" text   ,"id" SERIAL,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Cep_data" (
"bairro" text   ,"cep" text   ,"cep_id" integer   ,"complemento" text   ,"gia" text   ,"id" SERIAL,"localidade" text   ,"logradouro" text   ,"uf" text   ,"unidade" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Cep_data.cep" ON "public"."Cep_data"("cep")

ALTER TABLE "public"."Cep_data" ADD FOREIGN KEY ("cep_id")REFERENCES "public"."Cep"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200518015824-database
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,29 @@
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = ["native"]
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model Cep {
+  id       Int        @default(autoincrement()) @id
+  cep      String?
+  Cep_data Cep_data[]
+}
+
+model Cep_data {
+  bairro      String?
+  cep         String? @unique
+  cep_id      Int?
+  complemento String?
+  gia         String?
+  id          Int     @default(autoincrement()) @id
+  localidade  String?
+  logradouro  String?
+  uf          String?
+  unidade     String?
+  Cep         Cep?    @relation(fields: [cep_id], references: [id])
+}
```
