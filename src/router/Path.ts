export class Path {
  constructor(segments?: PathSegment[]) {
    this.segments = segments ?? [];
  }

  segments: PathSegment[] = [];
  isIndex = false;

  index() {
    this.isIndex = true;
    return this;
  }

  static(segment: string) {
    if (this.isIndex) {
      throw new Error("Can't add a static segment to an index path");
    }
    this.segments.push({
      type: "static",
      segment,
    });
    return this;
  }

  dynamic({ name }: { name: string }) {
    if (this.isIndex) {
      throw new Error("Can't add a dynamic segment to an index path");
    }
    this.segments.push({
      type: "dynamic",
      name,
    });
    return this;
  }
}

export const path = () => {
  return new Path();
};

type PathSegment = StaticPathSegment | DynamicPathSegment;

type StaticPathSegment = {
  type: "static";
  segment: string;
};

type DynamicPathSegment = {
  type: "dynamic";
  name: string;
};
