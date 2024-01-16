/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5nLyEcrwJWL
 */
import { Button } from "@/components/ui/button"

export default function Calculator() {
  return (
    <div className="w-full max-w-xs mx-auto bg-black text-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tetris Calculator</h2>
        <CalculatorIcon className="w-6 h-6 text-white" />
      </div>
      <div className="bg-gray-900 px-4 py-2">
        <div className="bg-black text-green-500 text-right text-2xl font-mono p-2 rounded">0</div>
      </div>
      <div className="grid grid-cols-4 gap-1 p-4">
        <Button className="bg-red-600">1</Button>
        <Button className="bg-red-600">2</Button>
        <Button className="bg-red-600">3</Button>
        <Button className="bg-blue-600">+</Button>
        <Button className="bg-yellow-600">4</Button>
        <Button className="bg-yellow-600">5</Button>
        <Button className="bg-yellow-600">6</Button>
        <Button className="bg-blue-600">-</Button>
        <Button className="bg-green-600">7</Button>
        <Button className="bg-green-600">8</Button>
        <Button className="bg-green-600">9</Button>
        <Button className="bg-blue-600">*</Button>
        <Button className="bg-purple-600">.</Button>
        <Button className="bg-purple-600">0</Button>
        <Button className="bg-purple-600">=</Button>
        <Button className="bg-blue-600">/</Button>
      </div>
    </div>
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
