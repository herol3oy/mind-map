import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { adjectives } from "./adjectives";
import { Stage } from "./stage";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-8xl p-8">
        <h1 class="text-3xl font-bold text-center mb-8">
          Personality Survey - Culture Index Survey
        </h1>

        @if (stage === Stage.SelfDescription) {
        <h2 class="text-2xl font-semibold mb-4 text-blue-600">
          Describe Yourself
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4"
        >
          @for (word of personalityTraits; track word) {
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-blue-600"
              [checked]="selfDescription.includes(word)"
              (change)="handleSelect(word, true)"
            />
            <span class="text-gray-800">{{ word }}</span>
          </div>
          }
        </div>
        <button
          class="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          (click)="handleNextStage()"
        >
          Next
        </button>
        } @else if (stage === Stage.WorkBehavior) {
        <h2 class="text-2xl font-semibold mb-4 text-green-600">
          Describe How You Should Behave at Work
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4"
        >
          @for (word of personalityTraits; track word) {
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-green-600"
              [checked]="workBehavior.includes(word)"
              (change)="handleSelect(word, false)"
            />
            <span class="text-gray-800">{{ word }}</span>
          </div>
          }
        </div>
        <button
          class="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          (click)="handleNextStage()"
        >
          Submit
        </button>
        } @else {
        <h2 class="text-2xl font-semibold mb-4 text-purple-600">
          Comparison of Results
        </h2>
        <div class="mb-4">
          <h3 class="text-xl font-semibold text-gray-800">
            Your Self-Description:
          </h3>
          <div class="flex flex-wrap gap-2">
            @for (word of selfDescription; track word) {
            <p
              class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
              {{ word }}
            </p>
            }
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-xl font-semibold text-gray-800">
            Work Behavior Description:
          </h3>
          <div class="flex flex-wrap gap-2">
            @for (word of workBehavior; track word) {
            <p
              class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              {{ word }}
            </p>
            }
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800">Common Words:</h3>
          <div class="flex flex-wrap gap-2">
            @for (word of compareResults(); track word) {
            <p
              class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
            >
              {{ word }}
            </p>
            }
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class AppComponent {
  Stage = Stage;
  stage: Stage = Stage.SelfDescription;
  personalityTraits = adjectives;

  selfDescription: string[] = [];
  workBehavior: string[] = [];

  handleSelect(word: string, isSelfDescription: boolean): void {
    if (isSelfDescription) {
      this.selfDescription = this.toggleSelection(this.selfDescription, word);
    } else {
      this.workBehavior = this.toggleSelection(this.workBehavior, word);
    }
  }

  handleNextStage(): void {
    this.stage++;
  }

  toggleSelection(list: string[], word: string): string[] {
    return list.includes(word)
      ? list.filter((w) => w !== word)
      : [...list, word];
  }

  compareResults(): string[] {
    const commonWords = this.selfDescription.filter((word) =>
      this.workBehavior.includes(word)
    );
    return commonWords.length ? commonWords : ["No common personality traits"];
  }
}
