/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CustomerFeedback {
        "close": () => Promise<void>;
        "header": string;
        "intro": string;
        "show": () => Promise<void>;
    }
    interface FeedbackForm {
        "header": string;
        "intro": string;
    }
    interface ScreenCapture {
        "initialise": () => Promise<void>;
    }
}
declare global {
    interface HTMLCustomerFeedbackElement extends Components.CustomerFeedback, HTMLStencilElement {
    }
    var HTMLCustomerFeedbackElement: {
        prototype: HTMLCustomerFeedbackElement;
        new (): HTMLCustomerFeedbackElement;
    };
    interface HTMLFeedbackFormElement extends Components.FeedbackForm, HTMLStencilElement {
    }
    var HTMLFeedbackFormElement: {
        prototype: HTMLFeedbackFormElement;
        new (): HTMLFeedbackFormElement;
    };
    interface HTMLScreenCaptureElement extends Components.ScreenCapture, HTMLStencilElement {
    }
    var HTMLScreenCaptureElement: {
        prototype: HTMLScreenCaptureElement;
        new (): HTMLScreenCaptureElement;
    };
    interface HTMLElementTagNameMap {
        "customer-feedback": HTMLCustomerFeedbackElement;
        "feedback-form": HTMLFeedbackFormElement;
        "screen-capture": HTMLScreenCaptureElement;
    }
}
declare namespace LocalJSX {
    interface CustomerFeedback {
        "header"?: string;
        "intro"?: string;
    }
    interface FeedbackForm {
        "header"?: string;
        "intro"?: string;
        "onFeedback"?: (event: CustomEvent<any>) => void;
    }
    interface ScreenCapture {
    }
    interface IntrinsicElements {
        "customer-feedback": CustomerFeedback;
        "feedback-form": FeedbackForm;
        "screen-capture": ScreenCapture;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "customer-feedback": LocalJSX.CustomerFeedback & JSXBase.HTMLAttributes<HTMLCustomerFeedbackElement>;
            "feedback-form": LocalJSX.FeedbackForm & JSXBase.HTMLAttributes<HTMLFeedbackFormElement>;
            "screen-capture": LocalJSX.ScreenCapture & JSXBase.HTMLAttributes<HTMLScreenCaptureElement>;
        }
    }
}
