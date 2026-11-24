import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test.describe('TodoMVC regression scenarios', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.open();
  });

  test('adds a task and updates the remaining count', async () => {
    await todo.addTodo('Review API contract');
    await expect(todo.todo('Review API contract')).toHaveCount(1);
    await expect(todo.remainingCount).toContainText('1 item left');
    await expect(todo.newTodo).toBeEmpty();
  });

  test('marks a task completed and filters completed work', async () => {
    await todo.addTodo('Write regression tests');
    await todo.addTodo('Investigate defect');
    await todo.completeTodo('Write regression tests');

    await expect(todo.todo('Write regression tests')).toHaveClass(/completed/);
    await todo.filterBy('Completed');
    await expect(todo.items).toHaveCount(1);
    await expect(todo.todo('Write regression tests')).toBeVisible();
    await todo.filterBy('Active');
    await expect(todo.todo('Investigate defect')).toBeVisible();
  });

  test('removes a task without affecting another task', async () => {
    await todo.addTodo('Remove this task');
    await todo.addTodo('Keep this task');
    await todo.removeTodo('Remove this task');

    await expect(todo.todo('Remove this task')).toHaveCount(0);
    await expect(todo.todo('Keep this task')).toHaveCount(1);
    await expect(todo.remainingCount).toContainText('1 item left');
  });

  test('does not create blank tasks', async () => {
    await todo.newTodo.fill('   ');
    await todo.newTodo.press('Enter');
    await expect(todo.items).toHaveCount(0);
  });
});
