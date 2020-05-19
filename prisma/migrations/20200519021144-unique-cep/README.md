# Migration `20200519021144-unique-cep`

This migration has been generated at 5/19/2020, 2:11:44 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Cep" DROP COLUMN "cep",
ADD COLUMN "cep" text  NOT NULL ;

CREATE UNIQUE INDEX "Cep.cep" ON "public"."Cep"("cep")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518015824-database..20200519021144-unique-cep
--- datamodel.dml
+++ datamodel.dml
@@ -4,14 +4,14 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model Cep {
   id       Int        @default(autoincrement()) @id
-  cep      String?
+  cep      String     @unique
   Cep_data Cep_data[]
 }
 model Cep_data {
```
