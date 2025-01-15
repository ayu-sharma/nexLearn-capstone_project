-- AlterTable
CREATE SEQUENCE dsatopic_index_seq;
ALTER TABLE "DSATopic" ALTER COLUMN "index" SET DEFAULT nextval('dsatopic_index_seq');
ALTER SEQUENCE dsatopic_index_seq OWNED BY "DSATopic"."index";
