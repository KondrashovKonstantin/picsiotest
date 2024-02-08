import yup from 'yup';

export const eventSchema = yup.object().shape({
    payload: yup.object().required(),
    possibleDestinations: yup.array().of(yup.object()),
    strategy: yup.string()
});
