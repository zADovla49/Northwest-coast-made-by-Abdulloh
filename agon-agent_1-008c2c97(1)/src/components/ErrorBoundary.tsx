import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

interface State {
  failed: boolean;
}

/**
 * Wraps each gallery so a single failing scene can never blank the whole page.
 * The fallback keeps the document readable and lets the visitor continue.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.warn(`[Northwest Coast] ${this.props.label} failed to render:`, error, info);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <section className="relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
          <p className="label-ui text-gold/70">Gallery temporarily closed</p>
          <h2 className="text-3xl text-bone">{this.props.label}</h2>
          <p className="max-w-xl font-body text-lg text-muted">
            This hall could not be displayed on your device, so the museum has kept the
            rest of the building open. Every other gallery on this page still works —
            keep scrolling.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ failed: false })}
            className="label-ui mt-2 border border-gold/40 px-6 py-3 text-gold transition hover:bg-gold/10"
          >
            Try this hall again
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
