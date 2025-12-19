import "./setExamStyle.css";
import addButton from "../../../assets/add_button_logo copy.png";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Header from "../../../components/header/header";
import { Question, Section, SectionValue } from "../../../utils/TypeProps";
import { Form, Formik } from "formik";
import LightAuthInput from "../../../components/LightAuthInput";
import RadioInput from "../../../components/RadioInput";
import ToastContainerComponent from "../../../components/notifications/Notifications";
import SelectInputWithLabel from "../../../components/SelectInput";
import SelectInputExam from "../../../components/SelectInputExam";
import { sectionSchema } from "../../../utils/ValidationSchema";

function SetExamPage() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [sectionValue, setSectionValue] = useState<SectionValue[]>([]);
  const [popup, setPopup] = useState(false);
  const [sectionDetailCopy, setSectionDetailCopy] = useState({
    sectionAlphabet: "",
    scoreObtainable: "",
    questionType: "",
  });
  const [sections, setSections] = useState<Section[]>([
    { questions: [] },
    { questions: [] },
    { questions: [] },
  ]);
  const [sectionDetail, setSectionDetail] = useState({
    sectionAlphabet: "",
    scoreObtainable: "",
    questionType: "",
  });
  const [totalScore, setTotalScore] = useState("");
  const [examDuration, setexamDuration] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [session, setSession] = useState("");
  const [faculty, setFaculty] = useState("");
  const [examDate, setExamDate] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [section, setSection] = useState("blank-section");
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { lecturerData } = useAuth();
  const navigate = useNavigate();

  const toggleAddSectionModal = () => {
    setPopup(!popup);
  };

  const nextSectionToggle = () => {
    sectionValue.forEach((EachSection, index) => {
      if (EachSection.questionType === section) {
        setSection(sectionValue[index + 1].questionType);
      }
    });
    // setCurrentSection((prevIndex) => (prevIndex + 1) % sectionValue.length);
  };
  const prevSectionToggle = () => {
    sectionValue.forEach((EachSection, index) => {
      if (EachSection.questionType === section) {
        setSection(sectionValue[index - 1].questionType);
      }
    });
    // setCurrentSection((prevIndex) => (prevIndex - 1) % sectionValue.length);
  };

  const handleAddSectionModalSubmitForm = (values: SectionValue) => {
    setSectionDetailCopy((prev) => ({
      ...prev,
      sectionAlphabet: values.sectionAlphabet,
      scoreObtainable: values.scoreObtainable,
      questionType: values.questionType,
    }));
    toggleAddSectionModal();
  };
  useEffect(() => {
    if (sectionDetailCopy.questionType) {
      setSection(sectionDetailCopy.questionType);
      setSectionDetail({
        sectionAlphabet: "",
        scoreObtainable: "",
        questionType: "",
      });
      // Check if there is a questionType before updating
      setSectionValue((prevSectionValue) => [
        ...prevSectionValue,
        sectionDetailCopy,
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionDetailCopy]);

  // fetchting each course detail frm the backedn

  useEffect(() => {
    fetchCourseDetails();
    return;
  }, []);

  const fetchCourseDetails = async () => {
    const res = await axiosInstance.get("/get-courses");
    setCourseDetails(res.data.coureDetailFromServer);
  };

  //

  const handleQuestionChange = (
    sectionIndex: number,
    questionIndex: number,
    field: keyof Question,
    value: string
  ) => {
    if (field === "correctAnswer") {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [`question${questionIndex}`]: value,
      }));
    }
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value,
    };
    setSections(updatedSections);
    // Update selectedAnswers when the correctAnswer field is changed
  };

  const addQuestion = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "objectives",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };

  const addTheoryQuestion = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "theory",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };
  const addFillInTheBlankQuestions = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "fill-in-the-blank",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

  const isObjectivesSectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() ||
        !examDuration.trim() ||
        !examDate.trim() ||
        !courseCode.trim() ||
        !courseTitle.trim() ||
        !department.trim() ||
        !semester.trim() ||
        !session.trim() ||
        !faculty.trim() ||
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      // Check if all options are filled
      if (
        !question.optionA.trim() ||
        !question.optionB.trim() ||
        !question.optionC.trim() ||
        !question.optionD.trim()
      ) {
        return false;
      }

      // Check if the correct answer is selected
      if (!question.correctAnswer.trim()) return false;

      return true;
    });
  };

  const isTheorySectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() &&
        !examDuration.trim() &&
        !examDate.trim() &&
        !courseCode.trim() &&
        !courseTitle.trim() &&
        !department.trim() &&
        !semester.trim() &&
        !session.trim() &&
        !faculty.trim() &&
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      return true;
    });
  };

  const isFillInTheBlankSectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() &&
        !examDuration.trim() &&
        !examDate.trim() &&
        !courseCode.trim() &&
        !courseTitle.trim() &&
        !department.trim() &&
        !semester.trim() &&
        !session.trim() &&
        !faculty.trim() &&
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      return true;
    });
  };

  const assembledQuestions: Question[] = sections.reduce(
    (allQuestions, section) => allQuestions.concat(section.questions),
    [] as Question[]
  );
  const submitQuestions = async (values: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/lecturers/set-exam", values);
      if (res.status === 200 && res.data.examQuestionCreated) {
        ToastContainerComponent.success("Exam questions created successfully");
        navigate(`/lecturers/dashboard/set-exams/success/${courseCode}`);
      }
    } catch (error) {
      ToastContainerComponent.error("Error creating exam questions:");
    } finally {
      setLoading(false);
    }
  };
  const departmentOptions =
    courseDetails.length > 0
      ? courseDetails.map((course: any) => ({
          label: course.department,
          value: course.department,
        }))
      : [];

  const facultyOptions =
    courseDetails.length > 0
      ? courseDetails.map((course: any) => ({
          label: course.faculty,
          value: course.faculty,
        }))
      : [];

  const courseCodeOptions =
    courseDetails.length > 0
      ? courseDetails.map((course: any) => ({
          label: course.courseCode,
          value: course.courseCode,
        }))
      : [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <LecturerSideBar />

      {/* Main content */}
      <main className="flex flex-col items-center ml-[20%] w-[80%]">
        {/* set exams heading wrapper */}
        {lecturerData && (
          <Header newUser={lecturerData.title + " " + lecturerData.firstName} />
        )}
        <div className="w-[90%] mb-8">
          <div className="my-4">
            <h1 className="font-semibold text-[32px]">Set Exams</h1>
          </div>
          {/* set exam form wrapper */}
          <div className="overflow-y-scroll flex flex-col flex-wrap">
            <div className="">
              {/* add modal pop up fixed position */}
              {popup && (
                <div className="h-screen w-[80%] ml-[20%] fixed z-50 top-0 left-0 bg-[#212121f8] backdrop-filter backdrop-blur-[10px] flex items-center justify-center">
                  <div className="w-[35%] p-8 bg-white rounded-2xl  pointer-events-auto">
                    <h1 className="text-2xl font-semibold mb-4">Add Section</h1>
                    <Formik
                      initialValues={{
                        sectionAlphabet: "",
                        scoreObtainable: "",
                        questionType: "",
                      }}
                      validationSchema={sectionSchema}
                      onSubmit={handleAddSectionModalSubmitForm}
                    >
                      <Form>
                        <LightAuthInput
                          label="Section"
                          name="sectionAlphabet"
                          type="text"
                          placeholder="Type section number or alphabet"
                          className="w-full"
                        />
                        <LightAuthInput
                          label="Score Obtainable"
                          name="scoreObtainable"
                          type="text"
                          placeholder="Enter total marks in section"
                          className="w-full mt-4"
                        />
                        <div className="flex flex-row gap-4 justify-evenly my-4">
                          <p>
                            Question Type <br />{" "}
                            <span className="text-textcolor text-[12px]">
                              Select 1 section at a time
                            </span>
                          </p>
                          <RadioInput
                            name="questionType"
                            label=""
                            options={[
                              {
                                label: "Multiple Choice",
                                value: "MultipleChoice",
                              },
                              {
                                label: "Fill in the Blank",
                                value: "FillInTheBlank",
                              },
                              { label: "Theory", value: "Theory" },
                            ]}
                          />
                        </div>
                        <div className="flex justify-evenly gap-4">
                          <button
                            className=" bg-authbordercolor rounded p-2 flex justify-center items-center w-[7rem]"
                            type="button"
                            onClick={toggleAddSectionModal}
                          >
                            Cancel
                          </button>
                          <button
                            className={`bg-primaryVarrounded p-2 flex justify-center items-center w-[7rem] `}
                            type="submit"
                          >
                            Add Section
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              )}

              {/* all set main set exam form */}
              <Formik
                initialValues={{
                  session: "",
                  semester: "",
                  faculty: "",
                  department: "",
                  courseCode: "",
                  examDate: "",
                  instruction: "",
                  courseTitle: "",
                  sections: sectionValue,
                  totalScore: Number(totalScore),
                  questions: assembledQuestions,
                  examDuration: "",
                  lecturerId: lecturerData?.lecturerId,
                }}
                onSubmit={submitQuestions}
              >
                <Form className="" onSubmit={submitQuestions}>
                  {/* course details to be fectched from backend */}
                  <div className="set-exams-top-form-wrapper">
                    <div className="set-exams-page-session-form-row">
                      <SelectInputWithLabel
                        name="session"
                        label="Session"
                        placeholder="Select session"
                        options={[
                          {
                            label: "2023/2024",
                            value: "2023/2024",
                          },
                        ]}
                      />

                      <SelectInputWithLabel
                        name="semester"
                        label="Semester"
                        placeholder="Select semester"
                        options={[
                          {
                            label: "First Semester",
                            value: "first semester",
                          },
                          {
                            label: "Second Semester",
                            value: "second semester",
                          },
                        ]}
                      />

                      <SelectInputExam
                        name="faculty"
                        label="Faculty"
                        placeholder="Select faculty"
                        options={facultyOptions}
                      />

                      <SelectInputExam
                        name="department"
                        label="Department"
                        placeholder="Select Department"
                        options={departmentOptions}
                      />
                    </div>

                    <div className="set-exams-page-session-form-row">
                      <SelectInputExam
                        name="courseCode"
                        label="Course Code"
                        placeholder="Select Course Code"
                        options={courseCodeOptions}
                      />

                      <SelectInputExam
                        name="courseTitle"
                        label="Course Title"
                        placeholder="Select Course Title"
                        options={courseCodeOptions}
                      />

                      <LightAuthInput
                        name="totalScore"
                        type="number"
                        placeholder="Enter total score"
                        label="Total Score"
                      />
                      <LightAuthInput
                        name="examDuration"
                        type="text"
                        placeholder="Enter time allowed"
                        label="Time Allowed"
                      />
                    </div>

                    <div className="set-exams-page-session-form-instruction-row">
                      <LightAuthInput
                        name="examDuration"
                        type="datetime-local"
                        placeholder="Enter date"
                        label="Date"
                      />
                      <LightAuthInput
                        name="instruction"
                        type="text"
                        placeholder="Enter instructions"
                        label="Exam Instructions"
                      />{" "}
                    </div>

                    <button
                      className="set-exam-page-session-form-button"
                      type="button"
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>

                  <div className="set-exams-page-bottom-form">
                    {/* add section button wrapper */}
                    <div className="set-exams-page-add-section-button-container">
                      <button
                        onClick={toggleAddSectionModal}
                        className="set-exams-page-add-section-button"
                        type="button"
                      >
                        {" "}
                        <img src={addButton} />
                        <span className="set-exams-page-add-section-button-text">
                          {" "}
                          Add Section
                        </span>
                      </button>
                    </div>
                    <div className="set-exams-page-questions-section-container">
                      <div className="set-exams-page-multiple-choice-questions-container">
                        <div className="set-exams-page-multiple-choice-questions-form">
                          {section === "blank-section" && (
                            <>
                              <h1 className="set-exams-page-questions-section-title">
                                Click on the add section button above to get
                                started{" "}
                              </h1>
                            </>
                          )}

                          {section === "MultipleChoice" && (
                            <div className="multiple-choice-question-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "MultipleChoice"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Multiple Choice Question)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "MultipleChoice"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          {section.scoreObtainable}
                                          Marks
                                        </>
                                      );
                                    })}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addQuestion(0)}
                                >
                                  +
                                </button>
                              </div>

                              <div className="set-exams-page-question-with-options">
                                <div className="set-exams-page-mcq-inner-wrapper">
                                  {sections[0].questions.map(
                                    (question, questionIndex) => (
                                      <div key={`objectives-${questionIndex}`}>
                                        <div className="number-question-input-wrapper">
                                          <span className="number-question-input-wrapper-number">
                                            {questionIndex + 1}
                                          </span>
                                          <input
                                            type="text"
                                            placeholder="Type question"
                                            className="objective-input-field"
                                            value={question.questionText}
                                            onChange={(e) =>
                                              handleQuestionChange(
                                                0,
                                                questionIndex,
                                                "questionText",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="options-wrapper">
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            A.
                                            <LightAuthInput
                                              name=""
                                              type="text"
                                              label=""
                                              placeholder="Option A"
                                              value={question.optionA}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionA",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <RadioInput
                                              name={`question${questionIndex}`}
                                              label=""
                                              options={[
                                                { label: "A", value: "A" },
                                                { label: "B", value: "B" },
                                                { label: "C", value: "C" },
                                                { label: "D", value: "D" },
                                              ]}
                                              value={question.optionA}
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionA
                                              }
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            B.
                                            <LightAuthInput
                                              name=""
                                              type="text"
                                              label=""
                                              placeholder="Option B"
                                              value={question.optionB}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionB",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <RadioInput
                                              name={`question${questionIndex}`}
                                              label=""
                                              options={[
                                                { label: "A", value: "A" },
                                                { label: "B", value: "B" },
                                                { label: "C", value: "C" },
                                                { label: "D", value: "D" },
                                              ]}
                                              value={question.optionB}
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionB
                                              }
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            C.
                                            <LightAuthInput
                                              name=""
                                              type="text"
                                              label=""
                                              placeholder="Option C"
                                              value={question.optionC}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionC",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <RadioInput
                                              name={`question${questionIndex}`}
                                              label=""
                                              options={[
                                                { label: "A", value: "A" },
                                                { label: "B", value: "B" },
                                                { label: "C", value: "C" },
                                                { label: "D", value: "D" },
                                              ]}
                                              value={question.optionC}
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionC
                                              }
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            D.
                                            <LightAuthInput
                                              name=""
                                              type="text"
                                              label=""
                                              placeholder="Option D"
                                              value={question.optionD}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionD",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <RadioInput
                                              name={`question${questionIndex}`}
                                              label=""
                                              options={[
                                                { label: "A", value: "A" },
                                                { label: "B", value: "B" },
                                                { label: "C", value: "C" },
                                                { label: "D", value: "D" },
                                              ]}
                                              value={question.optionD}
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionD
                                              }
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                        </div>
                                        <button
                                          className="fill-in-the-blanks-remove-question"
                                          type="button"
                                          onClick={() =>
                                            removeQuestion(0, questionIndex)
                                          }
                                        >
                                          Remove question
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              {sections[0].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={
                                    !isObjectivesSectionValid(sections[0])
                                  }
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}

                          {section === "Theory" && (
                            <div className="theory-question-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType === "Theory"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Theory)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType === "Theory"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          {section.scoreObtainable}
                                          Marks
                                        </>
                                      );
                                    })}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addTheoryQuestion(1)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="theory-question-wrapper">
                                {sections[1].questions.map(
                                  (question, questionIndex) => (
                                    <div key={`theory-${questionIndex}`}>
                                      <div className="number-question-input-wrapper">
                                        <span className="number-question-input-wrapper-number">
                                          {questionIndex + 1}
                                        </span>
                                        <input
                                          type="text"
                                          className="theory-question-input"
                                          placeholder="Question Text"
                                          value={question.questionText}
                                          onChange={(e) =>
                                            handleQuestionChange(
                                              1,
                                              questionIndex,
                                              "questionText",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>

                                      <button
                                        className="fill-in-the-blanks-remove-question"
                                        type="button"
                                        onClick={() =>
                                          removeQuestion(1, questionIndex)
                                        }
                                      >
                                        Remove Question
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                              {sections[1].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={!isTheorySectionValid(sections[1])}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}

                          {section === "FillInTheBlank" && (
                            <div className="fill-in-the-blank-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "FillInTheBlank"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Fill in the blanks)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "FillInTheBlank"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          {section.scoreObtainable}
                                          Marks
                                        </>
                                      );
                                    })}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addFillInTheBlankQuestions(2)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="Fill-in-the-blank">
                                {sections[2].questions.map(
                                  (question, questionIndex) => (
                                    <div
                                      key={`fill-in-the-blank-${questionIndex}`}
                                    >
                                      <div className="number-question-input-wrapper">
                                        <span className="number-question-input-wrapper-number">
                                          {questionIndex + 1}
                                        </span>
                                        <input
                                          type="text"
                                          className="theory-question-input"
                                          placeholder="Question Text"
                                          value={question.questionText}
                                          onChange={(e) =>
                                            handleQuestionChange(
                                              2,
                                              questionIndex,
                                              "questionText",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>

                                      <button
                                        type="button"
                                        className="fill-in-the-blanks-remove-question"
                                        onClick={() =>
                                          removeQuestion(2, questionIndex)
                                        }
                                      >
                                        Remove Question
                                      </button>
                                    </div>
                                  )
                                )}
                                {/* <button
                                  type="button"
                                  onClick={() => addFillInTheBlankQuestions(2)}
                                >
                                  Add question
                                </button> */}
                              </div>
                              {sections[2].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={
                                    !isFillInTheBlankSectionValid(sections[2])
                                  }
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* next and previous button */}
                        {sectionValue.length >= 2 ? (
                          <div className="set-exams-page-change-section-buttons-container">
                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={prevSectionToggle}
                            >
                              Previous Section
                            </button>

                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={nextSectionToggle}
                            >
                              Next Section
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SetExamPage;
