# JSON to PHP
Paste JSON data as PHP code. Nice and simple.

## Why?
Have you found yourself pasting JSON data from a database client such as TablePlus or an API responses into PHP files to run some quick tests with the data? Then you probably had to manually convert the JSON data into a PHP array or object, which can be tedious and error-prone.

I couldn't find a VS Code extension that did this exactly how I wanted it. Most of the existing extensions either didn't work as expected, didn't handle all JSON data types correctly, or simply didn't fit my needs.

## Under the Hood
We use the [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method to parse the JSON data and then converts it to a PHP variable using the [`json2php npm package`](https://github.com/daniel-zahariev/json2php).

## Usage
If you want to try it out, copy an example JSON data below and run the command `Paste JSON as PHP Variable` from the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).

### Example JSON Object
```json
{
  "name": "John Doe",
  "age": 30,
  "isEmployed": true,
  "skills": ["PHP", "JavaScript", "Python"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}
```

```php
$result = [
    'name' => 'John Doe',
    'age' => 30,
    'isEmployed' => true,
    'skills' => [
        'PHP',
        'JavaScript',
        'Python'
    ],
    'address' => [
        'street' => '123 Main St',
        'city' => 'Anytown',
        'country' => 'USA'
    ]
];
```

### Example JSON String
```json
"Hello, World!"
```

```php
$result = 'Hello, World!';
```

### Example JSON Array
```json
["apple", "banana", "cherry"]
```

```php
$result = [
    'apple',
    'banana',
    'cherry'
];
```

### Example JSON Number
```json
123
```

```php
$result = 123;
```

## Extension Settings
* [`json-to-php.assign-variable`](vscode://settings/json-to-php.assign-variable)
   * Default `true`.
   * Should the extension include the variable decoration (e.g., `$result = `) when pasting JSON data as a PHP variable? If set to `false`, it will only paste the PHP array/object without the variable assignment.
   * e.g. `$result = 1;` vs `1;`.
 * [`json-to-php.variable-name`](vscode://settings/json-to-php.variable-name)
   * Default `result`.
   * This setting is ignored if `json-to-php.assign-variable` is set to `false`.
   * The name of the variable to use when pasting JSON data as a PHP variable. You can change this to any valid PHP variable name.
   * e.g. `$result = 1;` vs `$myVariable = 1;`.
 * [`json-to-php.semicolon`](vscode://settings/json-to-php.semicolon)
   * Default `true`.
   * Should the extension append a semicolon at the end of the pasted PHP variable? If set to `false`, it will not append a semicolon.
   * e.g. `$result = "hello world";` vs `$result = 1`.



## Known Issues
No known issues at this time.

## Release Notes

### 1.0.0
Initial release of the extension.

---

**Enjoy!**
