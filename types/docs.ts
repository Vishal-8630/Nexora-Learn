export interface DocContent {
  title: string;
  description: string;
  content: string; // HTML string
}

export interface NavItem {
  title: string;
  slug: string; // e.g. "introduction/what-is-dynamics-365"
}

export interface NavSection {
  title: string;
  slug: string; // section prefix e.g. "introduction"
  items: NavItem[];
}

export interface NavGroup {
  title: string;
  sections: NavSection[];
}

export interface TocItem {
  id: string;
  title: string;
  level: number; // 2 = ##, 3 = ###
}

export interface Course {
  id: string;
  title: string;
  description: string;
  groups: NavGroup[];
  contentMap: Record<string, DocContent>;
}

export interface DocPageData {
  courseId: string;
  group: NavGroup;
  section: NavSection;
  item: NavItem;
  content: DocContent;
  prev: NavItem | null;
  next: NavItem | null;
  sectionIndex: number;
  itemIndex: number;
}
