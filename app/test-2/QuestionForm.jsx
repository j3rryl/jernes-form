"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import ParagraphIcon from "../components/icons/paragraph-icon";
import RadioButtonIcon from "../components/icons/radio-button-icon";
import MultiChoiceButtonIcon from "../components/icons/multichoice-button-icon";
import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";

const QuestionForm = () => {
  const [questionTypes, setQuestionTypes] = useState([
    { name: "Paragraph", id: "paragraph", icon: <ParagraphIcon /> },
    { name: "Radio", id: "radio", icon: <RadioButtonIcon /> },
    { name: "Multichoice", id: "multichoice", icon: <MultiChoiceButtonIcon /> },
  ]);
  const [questions, setQuestions] = useState([
    {
      questionText: "What is the capital of Kenya?",
      questionType: "paragraph",
      options: [{ optionText: "A" }, { optionText: "B" }, { optionText: "C" }],
      open: true,
      required: false,
    },
    {
      questionText: "What is the correct option?",
      questionType: "radio",
      options: [{ optionText: "A" }, { optionText: "B" }, { optionText: "C" }],
      open: true,
      required: false,
    },
    {
      questionText: "Choose all correct options.",
      questionType: "multichoice",
      options: [{ optionText: "A" }, { optionText: "B" }, { optionText: "C" }],
      open: true,
      required: false,
    },
  ]);

  function questionsUI() {
    return (
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        selectedKeys={"all"}
      >
        {questions?.map((question, i) => {
          return (
            <AccordionItem
              key={i}
              aria-label={question?.questionText}
              title={`${i + 1}. ${question?.questionText}`}
            >
              {question?.questionType === "radio" &&
                question.options.length > 0 && (
                  <RadioGroup isRequired={question.required}>
                    {question.options.map((option, j) => (
                      <Radio value={option.optionText} key={j}>
                        {option.optionText}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}

              {question?.questionType === "multichoice" &&
                question.options.length > 0 && (
                  <CheckboxGroup isRequired={question.required}>
                    {question.options.map((option, j) => (
                      <Checkbox value={option.optionText} key={j}>
                        {option.optionText}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )}

              {question?.questionType !== "radio" &&
                question?.questionType !== "multichoice" && (
                  <Textarea placeholder="Enter your answer here." />
                )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }
  return (
    <>
      <div className="mx-5">
        {questionsUI()}
        <div className="flex justify-end items-center mt-2">
          <Button color="primary">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default QuestionForm;
