export function getPostfix(rep: number) {
  if (rep === 1) return `${rep} бал`;
  if (rep >= 2 && rep <= 4) return `${rep} бали`;
  return `${rep} балів`;
}

interface ReputationTitle {
  title: string;
  minReputation: number;
}

const reputationTitles: ReputationTitle[] = [
  { title: "Учень академії", minReputation: 0 },
  { title: "Генін", minReputation: 51 },
  { title: "Чунін", minReputation: 101 },
  { title: "Токубетсу Джонін", minReputation: 151 },
  { title: "Джонін", minReputation: 201 },
  { title: "Каге", minReputation: 251 },
];

export function getReputationTitle(rep: number) {
  const title = reputationTitles
    .slice()
    .reverse()
    .find((title) => title.minReputation <= rep);
  return title ? title.title : null;
}
