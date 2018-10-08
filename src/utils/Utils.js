import { find } from 'lodash';

const tags = [
  { id: 1, name: 'Wedding' },
  { id: 2, name: 'Birthday' },
  { id: 3, name: 'Family' },
];

export const tagById = (id) => {
  const found = find(tags, tag => tag.id === id);

  return found ? found.name : undefined;
};
