// @ts-nocheck
import React from "react"
import { Button } from "@/components/ui/button"

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

type State = {
  currentOperand: string;
  previousOperand: string;
  operation: string;
  overwrite?: boolean;
};

function reducer(state: State, { type, payload }: { type: string, payload: { digit: number } }) {
  const currentOperand = state.currentOperand || "";
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) return {
        ...state,
        overwrite: false,
        currentOperand: `${payload.digit}`,
      };
      if (payload.digit === 0 && currentOperand === "0") return state;
      if (payload.digit === "." && currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: `${currentOperand}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {
        currentOperand: "",
        previousOperand: "",
        operation: "",
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == "" && state.previousOperand == "") return state;
      if (state.currentOperand == "") {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == "") {
        return {
          ...state,
          previousOperand: currentOperand,
          currentOperand: "",
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: state.currentOperand ? calculate(state.previousOperand, state.operation, state.currentOperand) : "",
        currentOperand: "",
        operation: state.currentOperand ? payload.operation:"",
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          previousOperand: "",
          currentOperand: "",
          operation: "",
        };
      }
      if (state.currentOperand == "") return state;
      if (state.currentOperand.length == 1) return {
        ...state,
        currentOperand: "",
      };
      return {
        ...state,
        currentOperand: currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (state.operation == "" || state.currentOperand == "" || state.previousOperand == "") return state;
      return {
        ...state,
        overwrite: true,
        previousOperand: "",
        currentOperand: calculate(state.previousOperand, state.operation, state.currentOperand),
        operation: "",
      };
    default:
      return {
        ...state,
        previousOperand: "",
        currentOperand: "",
        operation: "",
      };
  }
}

function calculate(operand1: string, operation: string, operand2: string): string {
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  switch (operation) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '*':
      return (num1 * num2).toString();
    case '/':
      return (num1 / num2).toString();
    default:
      return '';
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function formatNumber(number: string): string {
  if (number == "") return "";
  if (number.includes(".")) {
    const [integer, decimal] = number.split(".");
    return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`;
  }
  return INTEGER_FORMATTER.format(parseInt(number));
}
const initialState = {currentOperand:"", previousOperand:"", operation:""};

export default function Calculator() {
  const [{currentOperand, previousOperand, operation}, dispatcher] = React.useReducer(reducer, initialState)
  return (
    <div className="w-full max-w-[250px] mx-auto bg-black text-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tetris Calculator</h2>
        <CalculatorIcon className="w-8 h-8 text-white" />
      </div>
      <div className="bg-gray-900 px-6 py-3">
        <div className="bg-black text-green-500 text-right text-3xl font-mono p-3 rounded flex flex-col justify-around break-words	">
          <div className="text-xl text-green-200">{formatNumber(previousOperand)} {operation}</div>
          <div>{formatNumber(currentOperand)}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-6">
        <Button className="bg-gray-600 col-span-1" onClick={() => dispatcher({ type: ACTIONS.CLEAR})}>AC</Button>
        <Button className="bg-gray-600 col-span-2" onClick={() => dispatcher({ type: ACTIONS.DELETE_DIGIT })}>DEL</Button>
        {/* <Button className="bg-gray-600 col-span-1">%</Button> */}
        <OperationButton operation="+" dispatch={dispatcher} className="bg-blue-600 col-span-1" />
        <DigitButton digit={1} dispatch={dispatcher} className="bg-red-600 col-span-1" />
        <DigitButton digit={2} dispatch={dispatcher} className="bg-red-600 col-span-1" />
        <DigitButton digit={3} dispatch={dispatcher} className="bg-red-600 col-span-1" />
        <OperationButton operation="-" dispatch={dispatcher} className="bg-blue-600 col-span-1" />
        <DigitButton digit={4} dispatch={dispatcher} className="bg-yellow-600 col-span-1" />
        <DigitButton digit={5} dispatch={dispatcher} className="bg-yellow-600 col-span-1" />
        <DigitButton digit={6} dispatch={dispatcher} className="bg-yellow-600 col-span-1" />
        <OperationButton operation="*" dispatch={dispatcher} className="bg-blue-600 col-span-1" />
        <DigitButton digit={7} dispatch={dispatcher} className="bg-green-600 col-span-1" />
        <DigitButton digit={8} dispatch={dispatcher} className="bg-green-600 col-span-1" />
        <DigitButton digit={9} dispatch={dispatcher} className="bg-green-600 col-span-1" />
        <OperationButton operation="/" dispatch={dispatcher} className="bg-blue-600 col-span-1" />
        <DigitButton digit={0} dispatch={dispatcher} className="bg-purple-600 col-span-2" />
        <DigitButton digit="." dispatch={dispatcher} className="bg-purple-600 col-span-1" />
        <Button className="bg-blue-600 col-span-1" onClick={() => dispatcher({ type: ACTIONS.EVALUATE })}>=</Button>
        
      </div>
    </div>
  )
}

type DigitButtonProps = {
  digit?: number|string;
  className?: string;
  dispatch: React.Dispatch<{ type: string, payload: { digit: number } }>;
};

const DigitButton: React.FC<DigitButtonProps> = ({ dispatch, digit, className }) => {
  return (
    <Button className={className} onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}>{digit}</Button>
  )
}

type OperationButtonProps = {
  operation?: string;
  className?: string;
  dispatch: React.Dispatch<{ type: string, payload: { operation: string } }>;
};

const OperationButton: React.FC<OperationButtonProps> = ({ dispatch, operation, className }) => {
  return (
    <Button className={className} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>{operation}</Button>
  )
}

function CalculatorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}
