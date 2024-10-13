import React, { ReactNode } from "react";

type Props = { children: ReactNode; title?: string };

function Container({ children, title }: Props) {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      {children}
    </section>
  );
}

export default Container;
