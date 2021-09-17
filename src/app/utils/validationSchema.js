import * as yup from "yup";

const regSchema = yup.object().shape({
   first_name: yup.string().required(),
   last_name: yup.string().required(),
   email: yup.string().required().email(),
   username: yup.string().required(),
   password: yup.string().required(),
});

export { regSchema };
