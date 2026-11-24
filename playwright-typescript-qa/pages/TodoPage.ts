import { expect, type Locator, type Page } from '@playwright/test';

/** Small Page Object that keeps UI interaction details out of the test cases. */
export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly remainingCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.locator('.todo-list li');
    this.remainingCount = page.locator('.todo-count');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.newTodo).toBeVisible();
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodo.fill(text);
    await this.newTodo.press('Enter');
  }

  todo(text: string): Locator {
    return this.items.filter({ hasText: text });
  }

  async completeTodo(text: string): Promise<void> {
    await this.todo(text).locator('.toggle').check();
  }

  async removeTodo(text: string): Promise<void> {
    const item = this.todo(text);
    await item.hover();
    await item.locator('.destroy').click();
  }

  async filterBy(label: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.locator('.filters').getByRole('link', { name: label }).click();
  }
}
