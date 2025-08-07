import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

const dbCa = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUfCWeqxKrSIXTAlej2sWtsh/7VyAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTEyNGM1OWUtNjY3Zi00MGFmLWFiYzYtNmRhZGVjMjVj
Yjk5IFByb2plY3QgQ0EwHhcNMjMxMjA5MTYyNTIzWhcNMzMxMjA2MTYyNTIzWjA6
MTgwNgYDVQQDDC9lMTI0YzU5ZS02NjdmLTQwYWYtYWJjNi02ZGFkZWMyNWNiOTkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANMren+O
BuyODTN80aA8C/Cxtlnhyec/xzEeJK73egdRX+U6lPtvVSm2HQKIYnLHTMy8b1fG
5cEYPgOCaBUW1CzJcPMZrb02n/oVjTmYRNrs48mxj1vcrYxZW3WRB87nJHzJTRgQ
Ddc/Si/qMRZL8EHHagWNCrV7IZEIrlNXnDoIyBJRu8G7Xritm4BfGgiU08MKCAU2
9oNm+EShBOpAND8vw3guJSi2mgGbVIXtKwCd4BwgeaHIIDq/p0hqY/umF1ru1Hqs
07xbCHpDBjGU11iZlUtokjVewaqAZG79vC0h61vlkiQdu4iwb/yYpzYUKAyDxX2n
ZDK5IMJJMTx5vgvFqJPhM0vck7wvg9BWjQPN2TVcWWVS1gRQTKhsg/YeZLsDrI4o
uhk0vLA5DXSdyG7/rslFlRnpTf4w95e745189lG4mW9iRUbSAbmVbxiDkQcq8fER
qkBFos+QuGvosWG2b649ZPKxz2Q8Bv5mjlORobog0hezNzKfS64VMPpg2QIDAQAB
oz8wPTAdBgNVHQ4EFgQUm6DRHqlPnPqtQ2/qbMu5pqujr5YwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJvLMTsdUpwUEstm
MXqfhJZ9OOsNo60MSK+hELYzyk7Ovh8uDF1d5XALxhFYqXbHHWBUvm4Iig9Lhp9+
sANktToehsB9Ve4X7eNx1mlIAV+K/lxwu/v9Q6pWzUZHuvMdir1V1QgWL0qsKiaj
NsRt+3RJnuFmCIlAvAWEU/ntUGhzfW7bGxZLKlvg7FYWDrPm773ydm0/pp761bTp
H15L35DAjVGZIA3pk6+AYFuInRXGO2PTz7+TskCb/ty8ebmX17TA3t2H/P55cpR+
1xsOyHPCKqfJkFfG0yVYtfV+cyKia0j2yHWAoRbclBK+0J2r1PHf6h7Rhs27aM1d
iAieAVb//pCT+ad5R2S6LX72qc3IwH6F5762bzg/DNnlv0lHClQvKP5umputezY3
HgY9tczSDn1xjoIiobdvCLH8IR7RW/17jRVQCImWFmvsr1DoKFtlq27LQPRJRIfQ
wxsjodGn9YHji5DqOtD5S5m7vduPPJDx3QTksVY15vA0Jzu8aQ==
-----END CERTIFICATE-----`;

export const db = drizzle({
  connection: {
    user: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
    ssl: {
      ca: dbCa,
      rejectUnauthorized: false,
    },
  },
});
