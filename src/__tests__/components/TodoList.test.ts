import { mount } from '@vue/test-utils';
import { it , describe, expect, vi } from 'vitest';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TodoList from '@/components/TodoList.vue';

const vuetify = createVuetify({
  components,
  directives,
})

const mountTodoList = () => {
  const wrapper = mount({
    template: '<TodoList></TodoList>'
  },
  {
    props: {
      todos: [
        { title: "Todo 1", done: true },
        { title: "Todo 2", done: false },
      ]
    },
    global: {
      components: {
        TodoList,
      },
      plugins: [vuetify],
    }
  });
  return wrapper;
}

describe('TodoList', () => {
  it('Mounts correctly', async () => {
    expect(mountTodoList()).toBeTruthy();
  })

  it('Has todos', async () => {
    expect(mountTodoList().text()).toContain('Todo 1');
    expect(mountTodoList().text()).toContain('Todo 2');
  })

  it('Clicks delete todo button', async () => {
    const delBtn = mountTodoList().find('[data-testid=deleteTodo]');
    const spyDelete = vi.spyOn(delBtn, 'trigger');
    await delBtn.trigger('click');
    expect(spyDelete).toHaveBeenCalledOnce();
  })

  it('Clicks check todo', async () => {
    const delBtn = mountTodoList().find('[data-testid=checkTodo]');
    const spyDelete = vi.spyOn(delBtn, 'trigger');
    await delBtn.trigger('click');
    expect(spyDelete).toHaveBeenCalledOnce();
  })
})
