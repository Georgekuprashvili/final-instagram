import Head from "next/head";

export default function DataDeletion() {
  return (
    <>
      <Head>
        <title>Data Deletion Policy</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">Data Deletion Policy</h1>
        <p className="max-w-xl text-center text-lg">
          If you would like to delete your account or any personal data we
          store, please contact us at:
          <a
            href="mailto:kuprshviligeorge@gmail.com"
            className="text-blue-600 underline"
          >
            kuprshviligeorge@gmail.com
          </a>
          . <br />
          We will process your request within 7 business days.
        </p>
      </div>
    </>
  );
}
