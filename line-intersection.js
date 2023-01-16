const get_denominator = (line1, line2) =>
    (line1.p1.x - line1.p2.x) * (line2.p1.y - line2.p2.y)
  - (line1.p1.y - line1.p2.y) * (line2.p1.x - line2.p2.x);  

export const has_potential_intersection = (line1, line2) =>
  get_denominator(line1, line2) !== 0;

export const get_line_intersection_scales = (line1, line2) => {
  const denominator = get_denominator(line1, line2);

  const t_numerator =
      (line1.p1.x - line2.p1.x) * (line2.p1.y - line2.p2.y)
    - (line1.p1.y - line2.p1.y) * (line2.p1.x - line2.p2.x)

  const u_numerator =
      (line1.p1.x - line2.p1.x) * (line1.p1.y - line1.p2.y)
    - (line1.p1.y - line2.p1.y) * (line1.p1.x - line1.p2.x);

  const t = t_numerator / denominator;
  const u = u_numerator / denominator;
  return {t, u};
};

export const is_valid_range = (distances) => {
  const { t, u } = distances;
  return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
};