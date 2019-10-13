import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Onboarding = ({
  errors,
  touched,
  isSubmitting,
  isValidating,
  values
}) => {
  //   console.log(props);
  return (
    <Form className="form">
      <Field
        component="input"
        type="text"
        name="name"
        placeholder="Full Name"
      />
      {touched.name && errors.name && <p className="errors">{errors.name}</p>}
      <Field
        component="input"
        type="email"
        name="email"
        placeholder="email@example.com"
      />
      {touched.email && errors.email && (
        <p className="errors">{errors.email}</p>
      )}
      <Field
        component="select"
        name="role"
        data={["user-interface", "back-end", "front-end"]}
      >
        <option value="inital">Select Role</option>
        <option value="user-interface">User Interface</option>
        <option value="front-end"> Front End </option>
        <option value="back-end"> Back End </option>
      </Field>
      {touched.role && errors.role && <p className="errors">{errors.role}</p>}
      <Field
        component="input"
        type="password"
        name="password"
        placeholder="Password"
      />
      {touched.password && errors.password && (
        <p className="errors">{errors.password}</p>
      )}
      <Field
        component="input"
        type="password"
        name="verifyPassword"
        placeholder="Verify Password"
      />
      {touched.verifyPassword && errors.verifyPassword && (
        <p className="errors">{errors.verifyPassword}</p>
      )}
      <Field
        component="input"
        type="text"
        name="languages"
        placeholder="Languages"
      />
      {touched.languages && errors.languages && (
        <p className="errors">{errors.languages}</p>
      )}
      <Field
        component="input"
        type="text"
        name="experience"
        placeholder="Experience"
      />
      {touched.experience && errors.experience && (
        <p className="errors">{errors.experience}</p>
      )}
      <Field
        component="input"
        type="file"
        name="resume"
        placeholder="Upload Resume"
      />
      {touched.resume && errors.resume && (
        <p className="errors">{errors.resume}</p>
      )}
      <label className="button">
        Terms and Conditions
        <Field
          component="input"
          type="checkbox"
          checked={values.terms}
          name="terms"
          placeholder="Full Name"
        />
        {touched.terms && errors.terms && (
          <p className="errors">{errors.terms}</p>
        )}
      </label>
      <button className="button" type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues({
    name,
    email,
    password,
    verifyPassword,
    terms,
    languages,
    experience,
    resume,
    role
  }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      verifyPassword: verifyPassword || "",
      terms: terms || false,
      languages: languages || "",
      experience: experience || "",
      resume: resume || "",
      role: role || "inital"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Please Enter A Valid Email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Required"),
    verifyPassword: Yup.string()
      .min(8, "Password must be 8 characters or longer and should match")
      .required("Required"),
    name: Yup.string().required("Required"),
    terms: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions"),
    languages: Yup.string().required(),
    experience: Yup.string().required(),
    upload: Yup.mixed(),
    role: Yup.string()
      .oneOf(["user-interface", "back-end", "front-end"])
      .required("Required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // if (values.email !== "waffle@syrup.com") {
    //   setErrors({ email: "That email is already taken" });
    //   setSubmitting(false);
    // }
    if (values.password !== values.verifyPassword) {
      setErrors({ verifyPassword: "Passwords do not match" });
      setSubmitting(false);
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(Onboarding);
