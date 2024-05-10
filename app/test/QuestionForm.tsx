"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input, Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import ParagraphIcon from "../components/icons/paragraph-icon";
import RadioButtonIcon from "../components/icons/radio-button-icon";
import MultiChoiceButtonIcon from "../components/icons/multichoice-button-icon";
import EmptyRadioButton from "../components/icons/empty-radio-button";
import CloseIcon from "../components/icons/close-icon";
import SquareIcon from "../components/icons/square-icon";
import { TrashIcon } from "../components/icons/trash-icon";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { PlusIcon } from "";

const QuestionForm = () => {
  const [questionTypes, setQuestionTypes] = useState([
    { name: "Paragraph", id: "paragraph", icon: <ParagraphIcon /> },
    { name: "Radio", id: "radio", icon: <RadioButtonIcon /> },
    { name: "Multichoice", id: "multichoice", icon: <MultiChoiceButtonIcon /> },
  ]);
  const [formTitle, setFormTitle] = useState("New Form");
  const [questions, setQuestions] = useState([
    {
      questionText: "What is the capital of Kenya?",
      questionType: "radio",
      options: [{ optionText: "A" }, { optionText: "B" }, { optionText: "C" }],
      open: true,
      required: false,
    },
  ]);

  const changeFormTitle = (value: string) => {
    setFormTitle(value);
  };
  const changeQuestion = (value: string, index: number) => {
    var newQuestion = [...questions];
    newQuestion[index].questionText = value;
    setQuestions(newQuestion);
  };
  const deleteQuestion = (index: number) => {
    var newQuestion = [...questions];
    if (questions.length > 1) {
      newQuestion.splice(index, 1);
      setQuestions(newQuestion);
    }
  };
  const deepCopy = (obj: Object) => {
    return JSON.parse(JSON.stringify(obj));
  };
  const copyQuestion = (index: number) => {
    var allQuestions = deepCopy(questions);
    var newQuestion = allQuestions[index];
    setQuestions([...questions, newQuestion]);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "New Question",
        questionType: "radio",
        options: [
          { optionText: "Option A" },
          { optionText: "Option B" },
          { optionText: "Option C" },
        ],
        open: true,
        required: false,
      },
    ]);
  };
  const changeQuestionType = (value: string, index: number) => {
    var newQuestion = [...questions];
    newQuestion[index].questionType = value;
    setQuestions(newQuestion);
  };
  const changeOptionValue = (value: string, i: number, j: number) => {
    var newQuestion = [...questions];
    newQuestion[i].options[j].optionText = value;
    setQuestions(newQuestion);
  };
  const removeOption = (i: number, j: number) => {
    var newQuestion = [...questions];
    if (newQuestion[i].options.length > 1) {
      newQuestion[i].options.splice(j, 1);
      setQuestions(newQuestion);
    }
  };
  const addOption = (i: number) => {
    var newQuestion = [...questions];
    if (newQuestion[i].options.length < 5) {
      newQuestion[i].options.push({
        optionText: `Option ${newQuestion[i].options.length + 1}`,
      });
      setQuestions(newQuestion);
    }
  };
  function questionsUI() {
    return (
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        defaultSelectedKeys={"all"}
        className="my-3"
      >
        {questions?.map((question, i) => {
          return (
            <AccordionItem
              key={i}
              aria-label={question?.questionText}
              title={`${i + 1}. Question`}
            >
              <div className="flex justify-between items-center gap-2 mb-3">
                <Input
                  type="text"
                  key={i}
                  value={question?.questionText}
                  onChange={(e) => {
                    changeQuestion(e.target.value, i);
                  }}
                />
                <Select
                  items={questionTypes}
                  label="Select Question Type"
                  placeholder="Select question type"
                  defaultSelectedKeys={["radio"]}
                  onChange={(e) => {
                    changeQuestionType(e.target.value, i);
                  }}
                >
                  {(type) => (
                    <SelectItem key={type.id} textValue={type.name}>
                      <div className="flex gap-2 items-center">
                        {type.icon}
                        <div className="flex flex-col">
                          <span className="text-small">{type.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                <Button
                  isIconOnly
                  className="bg-transparent"
                  radius="full"
                  color="primary"
                  size="sm"
                  variant="bordered"
                  onPress={() => {
                    addQuestion();
                  }}
                >
                  <PlusIcon />
                </Button>
              </div>
              <div className="mx-2">
                {question?.questionType !== "paragraph" ? (
                  <>
                    {question?.options?.map((option, j) => {
                      return (
                        <div
                          className="flex justify-between items-center mb-2"
                          key={j}
                        >
                          <div className="flex justify-start items-center mb-2 gap-3 w-full">
                            {question?.questionType === "radio" ? (
                              <EmptyRadioButton />
                            ) : (
                              <SquareIcon />
                            )}
                            <Input
                              value={option.optionText}
                              size="sm"
                              className="w-5/6"
                              isRequired
                              key={j}
                              onChange={(e) => {
                                changeOptionValue(e.target.value, i, j);
                              }}
                            />
                          </div>
                          <div className="w-full flex justify-end">
                            <Button
                              isIconOnly
                              size="sm"
                              className="bg-transparent"
                              onPress={() => {
                                removeOption(i, j);
                              }}
                            >
                              <CloseIcon />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-start items-center mb-2 gap-3 w-full">
                      {question?.questionType === "radio" ? (
                        <EmptyRadioButton />
                      ) : (
                        <SquareIcon />
                      )}
                      <Button
                        className="bg-transparent"
                        variant="bordered"
                        color="primary"
                        onPress={() => {
                          addOption(i);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  </>
                ) : (
                  <Textarea placeholder="This for preview only." isDisabled />
                )}
              </div>

              <div className="flex justify-end items-center mt-3 gap-5">
                {/* <Button
                  isIconOnly
                  color="primary"
                  size="sm"
                  onPress={() => {
                    copyQuestion(i);
                  }}
                >
                  <TrashIcon />
                </Button> */}
                <Button
                  isIconOnly
                  color="danger"
                  size="sm"
                  onPress={() => {
                    deleteQuestion(i);
                  }}
                >
                  <TrashIcon />
                </Button>
                <Switch defaultSelected aria-label="Automatic updates">
                  Required
                </Switch>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }
  return (
    <>
      <div className="mx-5">
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          className="my-3"
          selectedKeys={"all"}
        >
          <AccordionItem aria-label={formTitle} title={formTitle}>
            <div className="flex justify-center items-center w-full gap-3">
              <Input
                size="sm"
                isRequired
                placeholder={formTitle}
                onChange={(e) => {
                  changeFormTitle(e.currentTarget.value);
                }}
              />
              <Input size="sm" placeholder="Form description" />
            </div>
          </AccordionItem>
        </Accordion>
        {questionsUI()}
      </div>
    </>
  );
};

export default QuestionForm;
