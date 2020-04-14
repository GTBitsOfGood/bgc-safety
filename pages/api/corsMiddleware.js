import Cors from "cors";
import urls from "../../utils/urls";

const cors = Cors({
  origin: urls.baseUrl
});

const useCors = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export default useCors;
