export default function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="pointer-events-none absolute inset-0 top-1/2 bg-gray-900 md:mt-24 lg:mt-0"
        aria-hidden="true"
      ></div>
      {/* <div className="absolute bottom-0 left-0 right-0 m-auto h-20 w-px translate-y-1/2 transform bg-gray-200 p-px"></div> */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">Join Us Now and Be Part of the Revolution! </h2>
            <p className="text-xl text-gray-600">
            Watch the words come to life on screen and communicate instantly. Experience lip sync with Go Linguistic!
            </p>
          </div>

          {/* Items */}
          <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {/* 1st item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-blue-300"
                      d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M20.571 37.714h5.715L36.57 26.286h8"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      strokeLinecap="square"
                      d="M41.143 34.286l3.428 3.428-3.428 3.429"
                    />
                    <path
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      d="M41.143 29.714l3.428-3.428-3.428-3.429"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              Revolutionary Technology
              </h4>
              <p className="text-center text-gray-600">
              Go Linguistic employs cutting-edge linguistic algorithms to provide seamless translation services.
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2" transform="translate(19.429 20.571)">
                    <circle
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      cx="12.571"
                      cy="12.571"
                      r="1.143"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              User-Friendly Interface
              </h4>
              <p className="text-center text-gray-600">
              Our platform offers an intuitive and user-friendly interface, making it easy for anyone to use.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-blue-300"
                      d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"
                    />
                    <path
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M36.571 32H40"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M24 32h3.429"
                      strokeLinecap="square"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              Cross-Platform Compatibility
              </h4>
              <p className="text-center text-gray-600">
              Whether you're using the mobile app or the web interface, Go Linguistic offers a consistent experience across all platforms.
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-white"
                      d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                      strokeLinecap="square"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              Accuracy and Reliability
              </h4>
              <p className="text-center text-gray-600">
              We prioritize accuracy and reliability, ensuring that you receive precise translations every time.
              </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-white"
                      d="M19.429 32a12.571 12.571 0 0021.46 8.89L23.111 23.11A12.528 12.528 0 0019.429 32z"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M32 19.429c6.943 0 12.571 5.628 12.571 12.571M32 24a8 8 0 018 8"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M34.286 29.714L32 32"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              Stay Connected
              </h4>
              <p className="text-center text-gray-600">
              Go Linguistic helps you stay connected with friends, family, and colleagues, breaking down language barriers effortlessly..
              </p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2" strokeLinecap="square">
                    <path
                      className="stroke-current text-white"
                      d="M29.714 40.358l-4.777 2.51 1.349-7.865-5.715-5.57 7.898-1.147L32 21.13l3.531 7.155 7.898 1.147L40 32.775"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M44.571 43.429H34.286M44.571 37.714H34.286"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight">
              Constant Innovation
              </h4>
              <p className="text-center text-gray-600">
              Our team is dedicated to continuous improvement and innovation, ensuring that Go Linguistic remains at the forefront of language technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
