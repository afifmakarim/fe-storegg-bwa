import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import {
  HistoryTransactionTypes,
  JWTPayloadTypes,
  UserTypes,
} from "../../../services/data-types";
import jwtDecode from "jwt-decode";
import { getTransactionDetail } from "../../../services/member";

interface TransactionsDetailProps {
  transactionDetail: HistoryTransactionTypes;
}
export default function Detail(props: TransactionsDetailProps) {
  const { transactionDetail } = props;
  console.log(transactionDetail);
  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface getServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: { idTrx: string };
}

export async function getServerSideProps({ req, params }: getServerSideProps) {
  const { idTrx } = params;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMAGES;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  const response = await getTransactionDetail(idTrx, jwtToken);
  console.log("adakah", response);
  return {
    props: { transactionDetail: response.data },
  };
}
